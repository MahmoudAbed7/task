const axios = require('axios');
class Todo {
    #url = "https://fakestoreapi.com/products";
    async list() {
        return await axios.get(this.#url)
    }
    async show(id) {
        return await axios.get(`${this.#url}/${id}`)
    }
    async create(data) {
        return await axios.post(this.#url, data)
    }
    async update(id, data) {
        return await axios.put(`${this.#url}/${id}`, data)
    }
    async delete(id) {
        return await axios.delete(`${this.#url}/${id}`)
    }
}
module.exports=new Todo;