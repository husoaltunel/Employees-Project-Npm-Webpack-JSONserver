export class Request {

    async get(url) {
        const request = await fetch(`http://localhost:3000/${url}`);
        const response = request.json();
        return response;
    }

    async post(url,data) {
        const request = await fetch(`http://localhost:3000/${url}`,{
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        })
        const response = await request.json();
        return response;
    }
    async delete(url) {
        const response = await fetch(`http://localhost:3000/${url}`,{method : 'DELETE'});
        const json = await response.json();
        return json;
    }
    async put(url,data) {
        const response = await fetch(`http://localhost:3000/${url}`,{
            method : "PUT",
            body : JSON.stringify(data),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        });
        const json = response.json();
        return json;
    }
}