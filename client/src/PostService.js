///Handles all requests

//Base Requires

// eslint-disable-next-line
import axios from 'axios'

//API URL
const url = 'api/posts'

//Create the Service
class PostService {
    //Get Posts - static so we can use without instantiate (PostService.getPosts directly)
    static getPosts() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url) // Get method from Axios
                const data = res.data; //data fetched by axios
                resolve(
                    data.map(x => ({ //maps through the data and returns all our posts
                        ...x,
                        createdAt: new Date(x.createdAt)
                    }))
                )
            } catch (err) {
                reject(err) //if something goes wrong
            }
        })
    }

    //Create Posts
    static insertPost(text) {
        return axios.post(url, {
            text
        }) //Post method from Axios 
        //ES5 or before, {text: text}
    }

    //Delete Posts
    static deletePost(id) {
        return axios.delete(`${url}/${id}`, {
            id
        })
    }
}

export default PostService