import React, { useState } from 'react'
import { toast } from  "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const URL = "https://dummyjson.com"

function Create(props) {
    const [product,setProduct] = useState({
        title:'',
        price:'',
        description:''
    })

    const navigate =  useNavigate() //used for redirection path inside logics

    const readValue = (e) => {
        const {name,value} = e.target;
        setProduct({...product,[name]:value})
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("new product = ",product)
            await axios.post(`${URL}/products/add`,product)
            .then(res => {
                toast.success("New product added successfully",res)
                navigate('/')
            }).catch(err => console.log(err.message))
        } catch (err) {
            toast.error(err)
        }
    }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Create</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <form autoComplete='off' onSubmit={submitHandler}>
                    <div className="form-group mt-2">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' value={product.title} onChange={readValue} className='form-control' required  />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="price">Price</label>
                        <input type="number" name='price' id='price' value={product.price} onChange={readValue} className='form-control' required  />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="description">Description</label>
                        <textarea name='description' id='description' cols="30" rows="5" value={product.description} onChange={readValue} className='form-control' required ></textarea>
                    </div>
                    <div className="form-group mt-2">
                        <input type="submit" value="Create Product" className='btn btn-outline-success' />
                    </div>

                </form>
            </div>
        </div>
    </div>
  )
}

export default Create
