/*This file contains the Reviewrs Components  
componentWillReceiveProps() for the pagination 
star function for looping of star and 
pagination section contains  the logic 
each page should have default ratings with button rating to show overall ratings (eg devlivery time)
*/
import React from "react"
import Morerating from './Morerating';

class Reviewrs  extends React.Component{
    constructor(props){
        super(props)
        this.state={ 
            start:0,
            end:3,
            selectpages:1,
            reviewno:-1
            
           }
           this.star=this.star.bind(this); 
    }
     componentWillReceiveProps(){
       console.log(this.state);
       this.setState({  start:0,
        end:3, selectpages:1 })
     }
   star= no =>{
      let star='';
     for( let i=0;i<no;i++){
      star+='☆';
     }
     return star;
   } 
    /* pagination section */
   pagination= pageget => { 
    
     const pages = Math.ceil(this.props.reviewdata.length / 3);
    let pageval=0;
     if(pageget==='p'){
       
      pageval= (this.state.selectpages!==1)? (this.state.selectpages-1):1; 
   
     }else{
       pageval= (this.state.selectpages!==pages)? (this.state.selectpages+1):(this.state.selectpages); 
    
     }
     this.setState({ selectpages :pageval,  start : ((pageval-1)*3) ,end:  ((pageval-1)*3)+3 , reviewno:-1 })
    //  console.log(pageval);
    
   }  
   /*pagesalacted for next pages  */
     pagesalacted= page => {     
       this.setState({ selectpages :page,  start : ((page-1)*3) ,end:  (((page-1)*3)+3) , reviewno:-1 })
     } 
    /*showrating for in the overall rating  */
     showratings = key =>{
      const reviewno= key;
       this.setState({ reviewno })
     }   
    render(){
        return( 
            <div>              
              <ul></ul>
              <div> </div>
              {/* this section contains the card for show the data from api  */}
              {this.props.reviewdata.slice(this.state.start,this.state.end).map((item,k) => { 
                return <div key={k} className="card">
                <div className="card-body">
                  <h4 className="card-title"> TITLE: {item.title}</h4>
           
                  <table className="table">
                <tbody>
                  <tr>
                    <td>COMMENT</td>
                    <td>  {item.comment} </td>
                  </tr>
                  <tr>
                    <td>USEFULNESS</td>
                    <td> {item.usefulness} </td>
                  </tr>
                  <tr>
                    <td>USERNAME</td>
                    <td>  {item.friend ? item.reviewer.name : '######'}</td>
                  </tr>
                  <tr>
                    <td>OVERALL RATINGS</td>
                    <td> <span className="star">{this.star(item.ratings.Overall)} </span> </td>
                  </tr>
                  <tr>
                    <td>CONNECTION LEVEL</td>
                  <td>{item.reviewer.connection_level.toFixed(4)}</td>
                </tr>
                </tbody>
                </table>
                <div>
                  {/*  <!-- Button for More Rating -->*/}
                  <button type="button" onClick={this.showratings.bind(this,k)} 
                  className="btn btn-primary">RATINGS</button> 
                  <br /> 
                     {/* data and function to other components to access and as a reference  */}
                  {(this.state.reviewno===k) ?<Morerating  ratinglist={item.ratings}  starfunction={this.star} />: ''}
                  </div>
                </div>
              </div>

              })}
                  {/* start of pagination  nagivation tag  */}
              <nav aria-label="Page navigation example">
                <ul className="pagination pg-blue">
                  <li className="page-item">
                    <button className="page-link" onClick={this.pagination.bind(this,'p')}>Previous</button>
                  </li>
                  {(() => {
                      const rows = [];
                      for (let i = 1; i <=  Math.ceil(this.props.reviewdata.length / 3); i++) {
                        rows.push(<li className={ i === this.state.selectpages ? 
                          'page-item  active'  : 'page-item'} key={i} >
                          <button className="page-link" onClick={this.pagesalacted.bind(this,i)}>{i}</button></li>);
                      }
                      return rows;
                    })()} 
                    <li className="page-item"><button className="page-link primary dark" onClick={this.pagination.bind(this,'n')}>Next</button></li>
                </ul>
              </nav>  
            </div>
        )
    }
}
export default Reviewrs