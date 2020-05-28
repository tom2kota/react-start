import React, {Component} from 'react';

class App extends Component {
    state = {
        init: 'initial state'
    }

    render() {
        console.log('App state:', this.state);
        return (
            <div className="ui container">
                App Start with Semantic UI & GitHub Pages
            </div>
        )
    }
}

export default App;
