import React, { Component } from 'react';
import axios from 'axios';
import {Spin,Pagination} from 'antd'
class SoonMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieList:[],
            loading:true,
            totalpage:0,
            start:0,
            count:10
        }
    }
    render() { 
        return(
            <div>
                {this.renderList()}
                <Pagination defaultCurrent={1} pageSize={this.state.count} total={this.state.totalpage} onChange={this.onChange.bind(this)} />
            </div>
        )
    }
    renderList(){
        if(this.state.loading){
            return (
                <div>
                    <Spin tip="Loading"></Spin>
                </div>
            )
        }else{
            return ( 
                <div>
                    <ul style={{overflow:'hidden'}}>
                        {
                            this.state.movieList.map((item,index)=>{
                                return (
                                    <li key={index} className="movieItem" onClick={this.goDetail.bind(this,item.id)}>
                                        <img src={item.images.small} alt={item.title} style={{width:120,height:170}}/>
                                        <h4 className="title">{item.title}</h4>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div> 
            );
        }
    }

    componentDidMount(){
        this.getData()
    }
    onChange(page){
        this.setState({
            start:page*this.state.count-10
        },()=>{
            this.getData()
        })
    }
    getData(){
        const that=this;
        that.setState({
            loading:true
        })
        axios.get(`/api/movie/coming_soon?start=${that.state.start}&count=${that.state.count}`).then((res)=>{
            that.setState({
                movieList:res.data.subjects,
                totalpage:res.data.total,
                loading:false
            });
        }).catch((err)=>{
            console.log('错误：'+err)
            that.setState({
                loading:true
            })
        })
    }
    goDetail(id){
        this.props.history.push({
            pathname:`/Detail/${id}`,
            state:{
                id:id
            }
        })
    }
}
 
export default SoonMovie;