import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const Content = () => {
    const [ search, setSearch ] = useState("")
    const [ jokes, setJokes ] = useState("")
    const [ jokeByCat, setJokeByCat ] = useState("")
    const [ categories, setCategories ] = useState(["animal"])

    const handleSearch = (event) => {
        setSearch(event.target.value.replaceAll(" ", "+"))
    }

    useEffect(() => {
        const urlCategories = `https://api.chucknorris.io/jokes/categories`
        const urlJokeByCat = `https://api.chucknorris.io/jokes/random?category=${categories}`
        const fetchData = async (url) => {
            const response = await axios.get(url)
            return response
        }
        try {
            fetchData(urlCategories).then(response => setCategories(response.data))
            .catch(e => console.log(e))
            fetchData(urlJokeByCat).then(response => setJokeByCat({...response.data}))
            .catch(e => console.log(e))
        } catch (e) {}
    }, [])

    const handleSubmit = async (event) => {
        if (search.length <= 3) {
            event.preventDefault()
            return setJokes({value: "Слово или фраза слишком короткая..."})
        }
        try {   
            event.preventDefault()
            const urlSearch = `https://api.chucknorris.io/jokes/search?query=${search}`
            const response = await axios.get(urlSearch)
            
            if (response.data.result.length !== 0) {
                setJokes({...response.data.result[0]})
            } else {
                setJokes({value:"Данное слово или фраза к сожалению не найдена..."})
            }
            
        } catch (e) {}
    }

    const getJokeByCat = async (event) => {
        try {
            console.log(event.target.value)
            const urlSearch = `https://api.chucknorris.io/jokes/random?category=${event.target.value}`
            const response = await axios.get(urlSearch)
            setJokeByCat({...response.data})
        } catch (e) {}
    }

    return (
        <div className="content">
            <section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="search">Введите слово или фразу для поиска...</label><br></br>
                    <div className="search">
                        <input type="text" name="search" id="search" onChange={handleSearch}/>
                    </div>
                    <div className="button__submit">
                        <button type="submit"  className="btn-submit">Сгенерировать шутку</button>
                    </div>
                </form>
            </section>
            <section>
                {jokes && 
                <textarea value={jokes.value}/>
                }
                
            </section>
            <section>
                <p>Выберите категорию для генерации шутки...</p>
                <select onChange={getJokeByCat}>
                    {categories.map(category => 
                    { return (
                        <option key={category}>{category}</option>
                    )})} 
                </select>
            </section>
            <section>
                {jokeByCat && 
                <blockquote>
                    {jokeByCat.value}
                </blockquote>
                }
            </section>
        </div>
    )
}