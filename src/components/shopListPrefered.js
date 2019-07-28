import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Shop from './Shop';

class ShopListPrefered extends Component {
    constructor() {
        super()
        this.state = {
          latitude: '',
          longitude: '',
        }

       
    }

     getDistanceFromLatLonInKm (lat1,lon1,lat2,lon2){
            var p = 0.017453292519943295;    // Math.PI / 180
            var c = Math.cos;
            var a = 0.5 - c((lat2 - lat1) * p)/2 + 
                    c(lat1 * p) * c(lat2 * p) * 
                    (1 - c((lon2 - lon1) * p))/2;
          
            return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
          
      

      
    }

    componentWillMount() {
          
        const location = window.navigator && window.navigator.geolocation
        if (location) {
          location.getCurrentPosition((position) => {
            this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            this.props.fetchPreferedShops(0 ,10 ,this.state.longitude,this.state.latitude) ;  
    
          }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
          })
        }           
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.shops.updatedShop !== this.props.shops.updatedShop) {
            const location = window.navigator && window.navigator.geolocation
            if (location) {
              location.getCurrentPosition((position) => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                this.props.fetchPreferedShops(0 ,10 ,this.state.longitude,this.state.latitude) ;  

              }, (error) => {
                this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
              })
            }
        }
      }
    
    renderShop() {
        return this.props.shops.preferedShops && this.props.shops.preferedShops.items.map(shop => {
            const distance  =this.getDistanceFromLatLonInKm(shop.location.coordinates[0][1],shop.location.coordinates[0][0],this.state.latitude,this.state.longitude)
             return <Grid  key={shop.id}  >
             <Shop shop={shop} distance ={distance} /> 
              </Grid>
        }) 
    }
    render() {
        const useStyles = makeStyles(theme => ({
            root: {
              flexGrow: 1,
            },
          }));
        if (!this.props.shops) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Grid container style={useStyles.root} justify="center" >
                    {this.renderShop()}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { shops: state.shops }
}

export default connect(mapStateToProps, actions)(ShopListPrefered);
