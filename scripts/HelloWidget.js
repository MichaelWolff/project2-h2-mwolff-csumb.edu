class HelloWidget extends React.Component {
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
                <p>The message is: { this.state.word } </p>
                <input type="text" value={this.state.new} onChange={(e) =>this.handleChange(e.target.value)} />
                <input type="submit" value="Add Word" onClick={() => this.increment()} />
            </div>
        );
    }
}