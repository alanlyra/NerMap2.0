#!/bin/bash

echo 'Convertendo arquivo' $1 'e salvando resultados em' $2

pdftotext -x 10 -y 20 -W 400 -H 490 $1 - \
  | tr "\\n" " "            \
  | perl -pe 's#\f# #g'     \
  | perl -pe 's#\. #.\n#g'  \
  | perl -pe 's#\? #?\n#g'  \
  | perl -pe 's#\! #!\n#g'  \
  | tr ";" ","              \
  | tr "\"" " "              \
  | sed 's#^##'             \
  | sed 's#$#;N#'           \
  | sed 's/  */ /g'         \
  | tee -a $2

  echo 'Terminado!'