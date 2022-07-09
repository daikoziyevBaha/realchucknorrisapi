import React from "react";
import axios from "axios";

//В классовом компоненте код чище
class ContentClass extends React.Component {
    constructor () {
        super();
        this.state = {
            searchValue: "",
            searchJoke: {},
            categories: [],
            jokeByCat: {}
        }
        
        this.categoriesUrl = 'https://api.chucknorris.io/jokes/categories'
        this.jokebycatUrl = `https://api.chucknorris.io/jokes/random?category=`
        this.searchUrl = `https://api.chucknorris.io/jokes/search?query=`
        this.randomUrl = 'https://api.chucknorris.io/jokes/random'

        this.setSearchValue = this.setSearchValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getData = this.getData.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
    }

    getData = async (url) => {
        const response = await axios.get(url)
        const data = await response.data
        return data
    }

    componentDidMount = async () => {
        try {
            const initJoke = await this.getData(this.randomUrl)
            const categories = await this.getData(this.categoriesUrl)
            if (initJoke && categories) {
                this.setState({ categories: [...categories], jokeByCat: {...initJoke} })
            }
        } catch(e) {
            console.log(e)
        }
    }

    setSearchValue = (event) => {
        this.setState({searchValue: event.target.value})
    }

    handleSubmit = async (event) => {
        try {
            if (this.state.searchValue.length <= 3) {
                event.preventDefault();
                return 
            }
            
            event.preventDefault();
            const data = await this.getData(this.searchUrl + this.state.searchValue.replaceAll(" ", "+"))
            if (data.result.length !== 0) {
                this.setState({searchJoke: {...data.result[0]}})
            } else {
                this.setState({searchJoke: {value: "Ува... По вашему запросу не удалось ничего найти :("}})
            }
            
        } catch(e) {
            console.log(e)
        }
        
    }

    handleCategory = async (event) => {
        try {
            const data = await this.getData(this.jokebycatUrl.concat(event.target.value))
            this.setState({ jokeByCat: {...data} })
        } catch(e) {
            console.log(e)
        }
    }
    render () {
        return (
            <div className="content">
                <section>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="search">Введите слово или фразу для поиска...</label><br></br>
                        <div className="search">
                            <input 
                            type="text"
                            name="search"
                            id="search"
                            onChange={this.setSearchValue} 
                            required  
                            minLength={3}/>
                        </div>
                        <div className="button__submit">
                            <button type="submit"  className="btn-submit">Сгенерировать шутку</button>
                        </div>
                    </form>
                </section>
                <section>
                    {this.state.searchJoke.value && 
                    <textarea value={this.state.searchJoke.value}/>
                    }
                    
                </section>
                <section>
                    <p>Выберите категорию для генерации шутки...</p>
                    <select onChange={this.handleCategory}>
                        {this.state.categories.map(category => 
                        { return (
                            <option key={category}>{category}</option>
                        )})} 
                    </select>
                </section>
                <section>
                    {this.state.jokeByCat && 
                    <blockquote>
                        {this.state.jokeByCat.value}
                    </blockquote>
                    }
                </section>
            </div>
        )
}
}

export default ContentClass;