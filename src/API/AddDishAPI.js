import axios from 'axios';

class AddDishAPI{
    constructor (){
        this.baseURL='http://localhost:80';
        this.AddDish=this.AddDish.bind(this);
    }

    AddDish(thamso){
        const api=axios.create({baseURL: this.baseURL});
        return api.post('/AddDish.php', thamso)
        .then(response => {
            console.log(response); 
            return response.data;  
        })
        .catch( error => {
            console.log(error);
        })
    }

}
export default AddDishAPI;
