class EasyHttp{

    // get Function

    async get(url){
        const response = await fetch(url);
        const resData =  await response.json();

        return resData;

    }

    async post(url,data){
        const response = await fetch(url, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }

    async put(url,data){
        const response = await fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resData = await response.json();
        return resData;
    }

    async delete(url){
        const response = await fetch(url,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        });

        const resData = await 'Resource deleted ...';
        return resData;
    }
}

export const http =  new EasyHttp();