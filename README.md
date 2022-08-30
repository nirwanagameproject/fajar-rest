# fajar-rest

## install depedency

npm install --global yarn

yarn add create-react-app

yarn add anchor-link anchor-link-browser-transport

yarn add @waxio/waxjs

yarn add react-popup-alert

## config to nodejs module

add to after

class APIError extends Error {
    constructor(path, response) {
        let message;
        
        if (response.json && response.json.error) {
            message = `${APIError.formatError(response.json.error)} at ${path}`;
        }
        else {
            message = `HTTP ${response.status} at ${path}`;
        }

the script is

	try{
            if (response.json.error.details.length > 0){
                message = response.json.error.details[0].message;
            }
        }catch(e){

        }

edit at function

	static formatError(error) {
     
the script is

	else if (error.details && error.details.length > 0) {
            return error.details[0].message;
        }
	
## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/80x15.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.
