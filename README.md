
# React Native Web demo



## Deployment

For basic setup

```bash
  npm i 
  npm run web // for web
  npm run android // for running in android
  npm run ios // for running in ios
```
or

```bash
  yarn 
  yarn web // for web
  yarn android // for android
  yarn ios // for ios
```


## For mockoon

Use test.json, open it through Mockoon, and run it as a server 
Use the setting to find out the localhost and port number, put it in the config/BaseSetting.js and change the variable named BASE_URL to your IP and port number

## Login
User below credentials  
UN: admin@gmail.com
PW: admin@123 
You can find this in the mockoon , login and rules

## CRUD Operation
You can use the form to add, update, delete any items 
You can click on the item to see the details 
You can filter using the top text box 

## GPS feature
To show the feature of GPS for phone capabilities, we kept a button on the login page when you click on "Show Location" it will show the current lat long of the location

NOTE:
1) this code can be divided in modules, but not implemented as its demo
2) Librarys like Axios not working with Mockoon Tool, so we used a basic method to work with API. We majorly use Axios for api works. 
