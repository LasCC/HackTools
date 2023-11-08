#!/usr/bin/env python3
from libnmap.parser import NmapParser
import json
import sys

nmap_report = NmapParser.parse_fromfile(sys.argv[1])

services = []

# Iterate over each host in the report
for host in nmap_report.hosts:
    # Iterate over each service in the host
    for service in host.services:
        # Create a dictionary to hold the data for this service
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
            "scripts_results": service.scripts_results,
            "metadata": ""
        }

        # Add the service data to the list of services
        services.append(service_data)
    
with open(sys.argv[1] + '.json', 'w') as f:
    json.dump(services, f, indent=2)
    print(json.dumps(services))
    
