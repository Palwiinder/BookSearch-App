import React from 'react'



class Book extends React.Component{
    render(){
        return(
            <div>
<li>
<div className="book">
  <div className="book-top">
    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.data.imageLinks.thumbnail})` }}></div>
    <div className="book-shelf-changer">
      <select onChange={(event) => {
this.props.updateBooks(this.props.data,event.target.value)
}}>
        <option value="move" disabled>Move to...</option>
        <option value="">--------</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  </div>
  <div className="book-title">{this.props.data.title}</div>
  <div className="book-authors">{this.props.data.authors}</div>
</div>
</li>

</div>
        )
    }

}
export default Book
