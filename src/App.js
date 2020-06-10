/*THIS FILES CONTAINS OTHER COMPONENTS METHODS FOR FORM AND 
API INEGRATION with axios  
in below link it can directly add the values of productid and reviewd id in this as $(1)/$(2)
`http://www.i2ce.in/reviews/${this.state.productid}/${this.state.reviewid}`
  */
import React from 'react';
import './App.css';
import './Pagination';
import Reviews from './Reviews';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import cogoToast from 'cogo-toast';

/*This is section for App class component */
class App extends React.Component {
  constructor(props) {
    super(props)
    /*this section for storing */
    this.state = {
      pages: 0,
      reviewFlag: false,
      reviews:{},
      Overallflag:false,
      conactionflag:false,
      usefulnessflag:false,
    }
    /*this section for binding */
    this.handleChangeinproduct=this.handleChangeinproduct.bind(this);
    this.handleChangeinreviews=this.handleChangeinreviews.bind(this);
    this.handleChangeinproduct=this.handleChangeinproduct.bind(this);
  }
  /*this section for handleChangeinproduct values 
  when click on button  with error and warnings to limit product id 1-20  */
  handleChangeinproduct = event => {
    let inputval = event.target.value;
    ((inputval < 21) && (inputval > 0)) ? this.setState({ productid: event.target.value }) : cogoToast.error('Product Id should be 1-20',{position:'top-right'} );

  };
    /*this section for handleChangeinreviews values 
  when click on button with error and warnings to limit reviwer id 1-10  */
  handleChangeinreviews = event => {
    let inputval = event.target.value;
    ((inputval < 11) && (inputval >=1))? this.setState({reviewid:event.target.value}) : cogoToast.error('Viwer Id should be 1-10',{position:'top-right'})
  };
     /*this section for sorting the values for overal rating button, connection level button, usefullness button 
  when click on button with error and warnings to limit reviwer id 1-10  */
  sort = type =>{ 
     if( this.state.reviewFlag===true)  {
        switch (type) {
          case 'Overall':
            const reviewsOverall=  this.state.reviews.sort((a, b) =>  (this.state.Overallflag)?(a.ratings.Overall - b.ratings.Overall):(b.ratings.Overall - a.ratings.Overall) );
            this.setState({ reviews:reviewsOverall ,Overallflag:!this.state.Overallflag })     
            break;

          case 'conaction':
            const reviewsconaction =  this.state.reviews.sort((a, b) => (this.state.conactionflag)? (a.reviewer.connection_level - b.reviewer.connection_level):(b.reviewer.connection_level - a.reviewer.connection_level) );
            this.setState({ reviews : reviewsconaction, conactionflag:!this.state.conactionflag })
            break;

          case 'usefulness':
            const reviewsusefulness=  this.state.reviews.sort((a, b) =>(this.state.usefulnessflag)? (a.usefulness - b.usefulness):(b.usefulness - a.usefulness) );
            this.setState({ reviews :reviewsusefulness, usefulnessflag:!this.state.usefulnessflag})
            break;

          default:
            console.log(`error.`);
        }
      }
        else{
          cogoToast.error('data not fount',{position:'top-right'} )
        }
  } 
  /* this section for on handleSubmit of go and error  and api call using  axios  */
  handleSubmit = event => {
    event.preventDefault();
    let valid= true;
    // console.log(typeof(this.state.productid ));
    if(typeof(this.state.productid ) == 'undefined'){
      valid=false;
      cogoToast.error('please enter Product Id',{position:'top-right'} );
    }
    if(typeof(this.state.reviewid ) == 'undefined'){
     valid = false;
    cogoToast.error('please enter Review Id',{position:'top-right'} );
   }
   if(valid === true){  
    axios.get(`http://www.i2ce.in/reviews/${this.state.productid}/${this.state.reviewid}`)
      .then(res => {
        const reviews =res.data.reviews;
        this.setState({ reviews  });        
       this.setState({ reviewFlag: true });
       cogoToast.success('Data Successfully Loaded');
      })
    }
  }
  /*below is rendering the the component */
  render() {
    /*returning the values with UI forms buttons  */
    return (
      <div className="App">
        <form className="text-center border border-light p-5" action="#!" onSubmit={this.handleSubmit} >
          <h1 className="maintitle mb-4">Based on Product 
          and Review Ids show Data  </h1>
          <div className="form-row mb-4">
            <div className="col">
              <input type="number" id="defaultRegisterFormFirstName" 
                className="form-control" max="20" min="1" 
                placeholder="Product Id" 
                onChange={this.handleChangeinproduct} />
            </div>
            <div className="col">
              <input type="number" id="defaultRegisterFormLastName" 
              className="form-control" max="10" min="1" 
              placeholder="Viewer Id" 
              onChange={this.handleChangeinreviews} />
            </div>
          </div>
          <button className="btn btn-info my-4 btn-block" type="submit">GO</button>
        </form>
        <button type="button"  onClick={this.sort.bind(this,'Overall')}  className="btn btn-primary" >Sort by Overall {this.state.Overallflag ? <i class="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>} </button>
        <button type="button"  onClick={this.sort.bind(this,'conaction')}  className="btn btn-primary" >Sort by Conncetion {this.state.conactionflag ? <i class="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>} </button>
        <button type="button"  onClick={this.sort.bind(this,'usefulness')}  className="btn btn-primary" >Sort by Usefulness {this.state.usefulnessflag ? <i class="fas fa-chevron-up"></i>:<i className="fas fa-chevron-down"></i>}  </button>    
        
        {this.state.reviewFlag ? <Reviews reviewdata={this.state.reviews}   /> : null}

      </div>
    );
  }
}
/* this below syntax for exporting the app to other components or files */
export default App;
