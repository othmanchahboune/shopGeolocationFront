import React ,{ Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import propTypes from 'prop-types' ;
import * as actions from '../actions';
import { connect } from 'react-redux';


export  class  Shop extends Component {
  static propTypes = {
    name: propTypes.string,
    description : propTypes.string 
  };
  constructor(props) {
    super(props)
}
  static defaultProps = {
    name :"shop",
    description :"default description"
  };
 
 like=()=>{
    const shop =this.props.shop;
    this.props.updateShopLikeStatus("LIKED",shop.id);
 
}
makeNeutral=()=>{
  const shop =this.props.shop;
  this.props.updateShopLikeStatus("NEUTRAL",shop.id);

}
dislike=()=>{
  const shop =this.props.shop;
  this.props.updateShopLikeStatus("DISLIKED",shop.id);

}
 render (){
  const useStyles = {
      card: {
        maxWidth: 170,
        margin : 10 ,
      }
    }
  return (
    <Card style={useStyles.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Photo alt"
          height='140'
          image={require("../shopIcon.jpg")}
          title="Photo alt"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.shop.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {this.props.shop.description}
         
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
          { this.props.distance  && "distance from me "+parseFloat(Math.round(this.props.distance * 100) / 100).toFixed(2) +" km"}
          </Typography>
        </CardContent>
      </CardActionArea>
      
      
      {(this.props.shop.likeStatus==="NEUTRAL") &&
      <CardActions>
        <Button size="small" color="secondary" onClick={this.dislike}>
          Dislike
        </Button>
        <Button size="small" color="primary"  onClick={this.like}>
          Like
        </Button>
        </CardActions>
      }
      {
        (this.props.shop.likeStatus==="LIKED") &&
        <CardActions>
        <Button size="small" color="secondary" onClick={this.makeNeutral}>
        Remove
      </Button>
       </CardActions>
      }
     
    </Card>
  );
}
}
const mapStateToProps = (state) => {
  return { updatedShop: state.updatedShop }
}

export default connect(mapStateToProps, actions)(Shop);
