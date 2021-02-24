Set K2CShell = CreateObject ("WScript.Shell")

Sub RunServerSide()
  MsgBox("Running client-side instance")
  K2CShell.run "cmd.exe /C cd server-side && npm start"
End Sub

Sub RunClientSide()
  MsgBox("Running client-side instance")
  K2CShell.run "cmd.exe /C cd client-side && npm start"
End Sub

Sub Main()
      ' Message box
      MsgBox("Starting K2C development instance")

      ' Run server-side instance
      call RunServerSide

      'Run client-side instance
      call RunClientSide
End Sub

call Main
