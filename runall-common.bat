cd D:\github\CommonMicroservices
rem start cmd /k "D:\software\redis\64bit\redis-server.exe D:\GitHub\CPMS\redis.conf
rem start cmd /k D:\github\encrypt-decrypt-util\encrypt-decrypt-API\run.bat
start cmd /k 1service-registry\run.bat
start cmd /k 2api-config-server\run.bat
start cmd /k 3api-gateway\run.bat
rem  start cmd /k alarms-service\run.bat
rem  start cmd /k dashboard\run.bat
rem  start cmd /k alert-generator\run.bat
start cmd /k user-management-service\run.bat
rem  start cmd /k modbusservice\run.bat
start cmd /k assetdataservice\run.bat
start cmd /k asset-management\run.bat
rem  start cmd /k log-view-service\run.bat
rem  start cmd /k reportconfiguration\run.bat
rem  start cmd /k reportgenerator\run.bat
rem  start cmd /k master-feature\run.bat
rem  start cmd /k iec61850-adapter-service\run.bat
rem  start cmd /k D:\github\iec61850-adapter\runcommon.bat
rem start cmd /k D:\github\CPMS\Microservices\cpms-service\runcommon.bat
rem start cmd /k D:\github\ESS\Microservices\ess-service\runcommon.bat
rem start cmd /k D:\github\SHEMS\Microservices\spevse-service\runcommon.bat
rem start cmd /k D:\github\power-plant-controller\Microservices\ppc-service\runcommon.bat
rem  start cmd /k D:\github\hems\Microservices\hems-service\runcommon.bat
start cmd /k D:\github\power-plant-controller\logger\1startzookeeper.bat
start cmd /k D:\github\power-plant-controller\logger\2startkafka.bat
cd  "D:\tmp\historian mfe testing\service"
start cmd /k runservice\run.bat
