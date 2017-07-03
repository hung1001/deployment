:: oscdimg - ADK Windows 10 Version 1703
:: Author: Hoang Hung
@echo off
color 0F
net session >nul 2>nul
if %errorlevel% neq 0 goto:admin
if exist "%WinDir%\SysWOW64" set Arch=amd64
if not exist "%WinDir%\SysWOW64" set Arch=x86
set "OscdImg=%~dp0OscdImg\%Arch%\oscdimg.exe"
title Delete Home Editions
echo.&set /p disk=Enter your disk: 
echo -------------------------------------------------
echo Copying files...
timeout 3 >Nul
xcopy /s /e %disk%:\ "%~dp0Deployment\ISO"
echo -------------------------------------------------
echo Deleting index...
Dism.exe /Delete-Image /ImageFile:"%~dp0Deployment\ISO\sources\install.wim" /Index:2
echo -------------------------------------------------
echo Exporting configuration file...
(echo ^[EditionID^]
echo Professional
echo ^[Channel^]
echo Retail
echo ^[VL^]
echo 0
)>"%~dp0Deployment\ISO\sources\EI.CFG"
(echo ^[PID^]
echo Value=VK7JG-NPHTM-C97JM-9MPGT-3V66T
)>"%~dp0Deployment\ISO\sources\PID.txt"
echo -------------------------------------------------
echo Mounting image...
Dism.exe /Mount-wim /wimfile:"%~dp0Deployment\ISO\sources\install.wim" /index:1 /Mountdir:"%~dp0Deployment\MOUNT"
echo -------------------------------------------------
echo Enabling NET 3.5...
for /f %%a in ('dir /b "%~dp0Deployment\ISO\sources\sxs\*netfx3*.cab"') do Dism.exe /Image:"%~dp0Deployment\MOUNT" /Add-Package /Packagepath:"%~dp0Deployment\ISO\sources\sxs\%%a"
echo -------------------------------------------------
echo Saving and unmount...
Dism.exe /Unmount-Image /MountDir:"%~dp0Deployment\MOUNT" /Commit
set "BIOSBoot=%~dp0Deployment\ISO\boot\etfsboot.com"
set "UEFIBoot=%~dp0Deployment\ISO\efi\microsoft\boot\efisys.bin"
echo -------------------------------------------------&echo.
set /p ISOLabel=Enter the ISO Volume Label : 
echo.&set /p ISOFileName=Enter the ISO File Name : 
echo -------------------------------------------------
echo Making iso...
if "%ISOLabel%"=="" (
	if exist "%UEFIBoot%" "%OscdImg%" -bootdata:2#p0,e,b"%BIOSBoot%"#pEF,e,b"%UEFIBoot%" -o -h -m -u2 -udfver102 "%~dp0Deployment\ISO" "%~dp0%ISOFileName%.iso"
	if not exist "%UEFIBoot%" "%OscdImg%" -bootdata:1#p0,e,b"%BIOSBoot%" -o -h -m -u2 -udfver102 "%~dp0Deployment\ISO" "%~dp0%ISOFileName%.iso"
)
if not "%ISOLabel%"=="" (
	if exist "%UEFIBoot%" "%OscdImg%" -bootdata:2#p0,e,b"%BIOSBoot%"#pEF,e,b"%UEFIBoot%" -o -h -m -u2 -udfver102 -l"%ISOLabel%" "%~dp0Deployment\ISO" "%~dp0%ISOFileName%.iso"
	if not exist "%UEFIBoot%" "%OscdImg%" -bootdata:1#p0,e,b"%BIOSBoot%" -o -h -m -u2 -udfver102 -l"%ISOLabel%" "%~dp0Deployment\ISO" "%~dp0%ISOFileName%.iso"
)
echo -------------------------------------------------
echo Delete "%~dp0Deployment\ISO" ?
choice /c YN /m "[Y]=Yes  [N]=No"
if %errorlevel%==1 (rd /q /s "%~dp0Deployment\ISO" >nul & mkdir "%~dp0Deployment\ISO")
echo -------------------------------------------------
echo Press any key to exit !
pause >nul & goto:eof

:admin
echo.&echo THIS SCRIPT REQUEST ADMINISTRATOR PRIVILEGES !
echo.&echo RIGHT CLICK AND "RUN AS ADMINISTRATOR" 
echo -------------------------------------------------
echo Press any key to exit !
pause >nul & goto:eof

