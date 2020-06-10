/*This file contains the More ratings when clicked to rating button  
the props calling and methods calling 
 */

import React from "react"
class Morerating  extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return(
            <div>
                <ul >
                    <table className="ratingtable ">
                        <tbody className="ratingtablebody ">
                            <tr className="rowratingtable ">
                                <td className="colratingtable"> DELIVERY TIME </td>
                                <td className="colratingtable">  <span className="star"> {this.props.starfunction(this.props.ratinglist.delivery_time)}</span> </td>
                            </tr>
                            <tr className="rowratingtable ">
                                <td className="colratingtable">DISCOUNT AND OFFERS </td>
                                <td className="colratingtable"> <span className="star"> {this.props.starfunction(this.props.ratinglist.discounts_and_offers)} </span> </td>
                            </tr>
                            <tr className="rowratingtable ">
                                <td className="colratingtable">MATCHES DESCRIPTION</td>
                                <td className="colratingtable">  <span className="star"> {this.props.starfunction(this.props.ratinglist.matches_description)}</span></td>
                            </tr>
                            <tr className="rowratingtable ">
                                <td className="colratingtable">MATCHES PHOTO</td>
                                <td className="colratingtable"> <span className="star"> {this.props.starfunction(this.props.ratinglist.matches_photo)}</span> </td>
                            </tr>
                            <tr className="rowratingtable ">
                                <td className="colratingtable">PACKAGING</td>
                                <td className="colratingtable"><span className="star"> {this.props.starfunction(this.props.ratinglist.packaging)}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </ul>
            </div>
        )
    }
}
export default Morerating