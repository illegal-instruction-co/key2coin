Set K2CSSShell = CreateObject ("WScript.Shell")
Set K2CCSShell = CreateObject ("WScript.Shell")
Set oWSH = CreateObject("WScript.Shell")
 vbsInterpreter = "cscript.exe"

 Call ForceConsole()

 Function printf(txt)
    WScript.StdOut.WriteLine txt
 End Function

 Function printl(txt)
    WScript.StdOut.Write txt
 End Function

 Function scanf()
    scanf = LCase(WScript.StdIn.ReadLine)
 End Function

 Function wait(n)
    WScript.Sleep Int(n * 1000)
 End Function

 Function ForceConsole()
    If InStr(LCase(WScript.FullName), vbsInterpreter) = 0 Then
        oWSH.Run vbsInterpreter & " //NoLogo " & Chr(34) & WScript.ScriptFullName & Chr(34)
        WScript.Quit
    End If
 End Function

 Function cls()
    For i = 1 To 50
        printf ""
    Next
 End Function

 Sub RunServerSide()
   K2CSSShell.run "cmd.exe /C cd server-side && npm start"
 End Sub

 Sub RunClientSide()
   K2CCSShell.run "cmd.exe /C cd client-side && npm start"
 End Sub

 Sub RunClientSideAdmin()
   K2CCSShell.run "cmd.exe /C cd client-side-admin && npm start"
 End Sub

 Sub Main()
   printf " -----------------------------"
   printf "|        _  __ ___ ___       |"
   printf "|       | |/ /|_  ) __|      |"
   printf "|       | ' <  / / (__       |"
   printf "|       |_|\_\/___\___|      |"
   printf "|       Dev Ins.   v1.0      |"
   printf " -----------------------------"
   printf " Creating instance... "

   wait(1)

   ' Message box
   printf "Starting K2C server-side instance"

   ' Run server-side instance
   call RunServerSide

   ' Message box
   printf "Starting K2C client-side instance"

   'Run client-side instance
   call RunClientSide

   'Run client-side-admin instance
   call RunClientSideAdmin

   ' printf "Server-side instance id: 1"
   ' printf "Client-side instance id: 2"
   '
   ' ' Run restart manager
   ' call RestartInstance

   wait(1)
   End Sub

 call Main
