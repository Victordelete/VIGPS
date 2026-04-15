
# VIGPS

Aplicativo mobile que realiza a gravação de vídeo com registro de dados de GPS simultaneo para tratamento em diferentes cenários.

## Ferramentas

O aplicativo utiliza React Native para desenvolvimento do aplicativo, com banco Sqlite para registro de informações localmente, além scripts python para script de transformação. 

## Configuração Ambiente

Para o desenvolvimento foi utilizado o Anaconda para criação de ambiente virtual. Crie ambiente com o comando: 

> conda create -n vigps

> conda activate vigps

Instale versão de nodejs:

> conda install -c conda-forge nodejs=20

Instale o expo cli para rodar o software:

> npm install -g expo-cli@6.3.12

E verifique a instalação da versão correta com:

> expo --version

Instale as dependências do projeto com o comando:

> npm install

Para rodar o aplicativo em desenvolvimento basta rodar o comando:

> npm start

O aplicativo pode ser visualizado em desenvolvimento em emuladores locais ou aplicativo Android Expo Go.

## Utilização

Segue telas do aplicativo. Segue tela inicial de recebimento do usuário.

![Tela inicial](img\landing_screen.jpeg)

Segue tela home do aplicativo com opções de ferramentas disponíveis:

![Tela Home](img\home_screen.jpeg)

Segue tela de gravação de vídeos. Os vídeos gravados possuem associação a dados de gps registraos em banco de dados com frequência miníma de 30 registros por segundo.

![Tela Gravação](img\record_screen.jpeg)

Lista com os vídeos gravados e possíveis ações individuais:

![Tela Lista de Vídeos](img\videos_screen.jpeg)

Tela para gravação de dados de GPS diretamente:

![Tela Gravação de GPS](img\save_gps_screen.jpeg)


## Build

✅ 1. Instalar o EAS CLI

No seu projeto, instale o CLI:

npm install -g eas-cli

Depois faça login:

eas login
✅ 2. Inicializar o EAS no projeto

Dentro da pasta do projeto:

eas init

Isso vai criar o arquivo eas.json.

✅ 3. Configurar para gerar APK

Por padrão, o Expo gera AAB (Android App Bundle).
Para gerar APK, edite o eas.json:

{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
✅ 4. Gerar o APK

Agora rode:

eas build -p android --profile preview
-p android → plataforma Android
--profile preview → usa a config que você criou
✅ 5. Baixar o APK

Após o build:

O Expo vai te dar um link
Você pode baixar direto o .apk e instalar no celular