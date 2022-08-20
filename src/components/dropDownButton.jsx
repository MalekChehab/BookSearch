import React from 'react';
import {IconBookDownload} from "@tabler/icons";
import './dropDownButton.css';

class DropDownButton extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isVisible: false
      };
    }
  
    _handleClick(e) {
      e.preventDefault();
      this.setState({
        isVisible: !this.state.isVisible
      });
    }
  
    render() {
      return (
        <div>
          <button 
            className="button" 
            type="button" 
            onClick={(e)=>this._handleClick(e)}>
                <IconBookDownload style={{marginRight: 5}}/>{this.props.name}
        </button>
        {this.state.isVisible ?
            (<ul className='dropdown'>
                {this.props.children}
            </ul>)
           : null }
        </div>
      );
    }
}

export default DropDownButton;