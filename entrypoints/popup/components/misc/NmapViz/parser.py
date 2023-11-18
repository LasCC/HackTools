#!/usr/bin/env python3
from libnmap.parser import NmapParser
import json
import sys

nmap_report = NmapParser.parse_fromfile(sys.argv[1])

services = []


def remove_duplicates(lst, key):
    seen = set()
    deduped = []
    for item in lst:
        val = item[key]
        if val not in seen:
            seen.add(val)
            deduped.append(item)
    return deduped



def extract_highest_cvss_from_vulners_scripts(service_data, scripts_results):
    highest_cvss = 0
    for script_result in scripts_results:
        if script_result.get('id') == 'vulners':
            for cpe, cpe_data in script_result.get('elements', {}).items():
                print(cpe_data)
                for vulnerability in cpe_data.get(None, []):
                    print(vulnerability)
                    cvss = float(vulnerability.get('cvss', '0'))
                    if cvss > highest_cvss:
                        highest_cvss = cvss
    service_data['highest_cvss'] = highest_cvss
    return service_data


def simplify_elements(scripts_results):
    for script_result in scripts_results:
        if script_result.get('id') == 'vulners':
            for cpe, cpe_data in script_result.get('elements', {}).items():
                script_result['elements'][cpe] = cpe_data.get(None, [])
    return scripts_results



def extract_is_exploitable(service_data, scripts_results):
    is_exploitable = False
    for script_result in scripts_results:
        if script_result.get('id') == 'vulners':
            for cpe, cpe_data in script_result.get('elements', {}).items():
                for vulnerability in cpe_data.get(None, []):
                    if vulnerability.get('is_exploit') == 'true':
                        is_exploitable = True
                        break
    service_data['is_exploitable'] = is_exploitable
    return service_data


def extract_smb_signing_status(service_data, scripts_results):
    smb_signing_status = "unknown"
    for script_result in scripts_results:
        print(script_result)
        if script_result.get('id') == 'smb-security-mode':
            smb_signing_status = script_result.get('output', '').split('\n')[3].strip()
            break
    service_data['smb_signing_status'] = smb_signing_status
    return service_data


def extract_smb_signing_status(host):
    smb_signing_status = "unknown"
    for script in host.scripts_results:
        if script.get('id') == 'smb-security-mode':
            smb_signing_status = script.get('elements', {}).get('message_signing', 'unknown')
            break
    return smb_signing_status

# Iterate over each host in the report
for host in nmap_report.hosts:
    smb_signing_status = extract_smb_signing_status(host)
    # exit()
    for service in host.services:
        service_data = {
            "id": f"{host.address}-{service.port}",
            "address": host.address,
            "hostnames": host.hostnames,
            "uptime": host.uptime,
            "distance": host.distance,
            "port": service.port,
            "state": service.state,
            "protocol": service.protocol,
            "service": service.service,
            "banner": service.banner,
            "scripts_results": (service.scripts_results),
            "smb_signing_status": smb_signing_status if service.port == 445 else "not applicable",

            "tag" : "NONE" # EXPLOITED
        }
        service_data = extract_highest_cvss_from_vulners_scripts(service_data, service.scripts_results)
        service_data = extract_is_exploitable(service_data, service.scripts_results)
        

        services.append(service_data)
    
with open(sys.argv[1] + '.json', 'w') as f:
    try:
        services = remove_duplicates(services, "id")
        json.dump(services, f, indent=2)
    except BrokenPipeError:
        sys.stderr.close()
        exit(1)

