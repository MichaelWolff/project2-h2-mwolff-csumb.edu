import * as React from 'react';
import { MyFavoriteAnimalList } from './MyFavoriteAnimalList';
import { Socket } from './Socket';
import { Contacts } from './Contacts'

export class Content extends React.Component {
      constructor() {
        super();
        this.state = {
            word: '',
            new: '',
        };
    }

    increment() {
        this.setState({
            word: this.state.word + this.state.new,
            new: '',
        })
    }

    handleChange(value) {
        this.setState({
            new: value
        });
    }

    render() {
        return (
            <div>
                <h1>- The message is: { this.state.word } </h1>
                <input type="text" value={this.state.new} onChange={(e) =>this.handleChange(e.target.value)} /><br></br>
                <input type="submit" value="Add Word" onClick={() => this.increment()} />
                <input type="text" value={this.state.new+this.state.new} />
            </div>
            
        );
    }
    
}
