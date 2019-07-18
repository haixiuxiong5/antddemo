import React, { Component } from 'react';
import axios from 'axios'
import {Row,Col,Spin,Rate,Progress} from 'antd'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            movieId:props.location.state.id,
            movieInfo:{},
            loading:true,
            ratingnum:0
        }
    }
    render() { 
        if(this.state.loading){
            return (
                <div className="example">
                    <Spin tip="Loading"/>
                </div>
            )
        }else{
            return ( 
                <div>
                    <Row>
                        <Col span={18}>
                            <h2>{this.state.movieInfo.title} ({this.state.movieInfo.original_title})</h2>
                            <Row gutter={24}>
                                <Col span={4}>
                                    <img src={this.state.movieInfo.images.small} alt="" style={{width:'100%'}}></img>
                                </Col>
                                <Col span={15}>
                                    <p>
                                        <label>导演：</label>
                                        {
                                            this.state.movieInfo.directors.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item.name}</span>)
                                                }else{
                                                    return (<span key={index}> / {item.name}</span>)
                                                }
                                                
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>编剧：</label>
                                        {
                                            this.state.movieInfo.writers.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item.name}</span>)
                                                }else{
                                                    return (<span key={index}> / {item.name}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>主演：</label>
                                        {
                                            this.state.movieInfo.casts.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item.name}</span>)
                                                }else{
                                                    return (<span key={index}> / {item.name}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>类型：</label>
                                        {
                                            this.state.movieInfo.genres.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item}</span>)
                                                }else{
                                                    return (<span key={index}> / {item}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>制片国家/地区：</label>
                                        {
                                            this.state.movieInfo.countries.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item}</span>)
                                                }else{
                                                    return (<span key={index}> / {item}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>语言：</label>
                                        {
                                            this.state.movieInfo.languages.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item}</span>)
                                                }else{
                                                    return (<span key={index}> / {item}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>上映日期：</label>
                                        {
                                            this.state.movieInfo.pubdates.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item}</span>)
                                                }else{
                                                    return (<span key={index}> / {item}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>片长：</label>
                                        {
                                            this.state.movieInfo.durations.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item}</span>)
                                                }else{
                                                    return (<span key={index}> / {item}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                    <p>
                                        <label>又名：</label>
                                        {
                                            this.state.movieInfo.aka.map((item,index)=>{
                                                if(index===0){
                                                    return (<span key={index}>{item}</span>)
                                                }else{
                                                    return (<span key={index}> / {item}</span>)
                                                }
                                            })
                                        }
                                    </p>
                                </Col>
                                <Col span={5}>
                                    <h4>豆瓣评分</h4>
                                    <div>
                                        <span>{this.state.movieInfo.rating.average}</span>
                                        <div style={{display:'inline-block'}}>
                                            <Rate disabled allowHalf defaultValue={this.state.movieInfo.rating.average/2}></Rate>
                                            <p>{this.state.movieInfo.ratings_count}人评价</p>
                                        </div>
                                    </div>
                                    <div className="starwrap">
                                        <div>5星<div style={{display:'inline-block',width:100}}><Progress percent={parseFloat((this.state.movieInfo.rating.details[5]/this.state.ratingnum*100).toFixed(2))} strokeWidth={6} /></div></div>
                                        <div>4星<div style={{display:'inline-block',width:100}}><Progress percent={parseFloat((this.state.movieInfo.rating.details[4]/this.state.ratingnum*100).toFixed(2))} strokeWidth={6} /></div></div>
                                        <div>3星<div style={{display:'inline-block',width:100}}><Progress percent={parseFloat((this.state.movieInfo.rating.details[3]/this.state.ratingnum*100).toFixed(2))} strokeWidth={6} /></div></div>
                                        <div>2星<div style={{display:'inline-block',width:100}}><Progress percent={parseFloat((this.state.movieInfo.rating.details[2]/this.state.ratingnum*100).toFixed(2))} strokeWidth={6} /></div></div>
                                        <div>1星<div style={{display:'inline-block',width:100}}><Progress percent={parseFloat((this.state.movieInfo.rating.details[1]/this.state.ratingnum*100).toFixed(2))} strokeWidth={6} /></div></div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            );
        }
        
    }
    componentDidMount(){
        this.getData()
    }
    getData(){
        const that=this;
        axios.get(`/api/movie/subject/${that.state.movieId}`).then((res)=>{
            console.log(res.data)
            let stars=res.data.rating.details;
            let num=0;
            for(let i in stars){
                num+=stars[i];
            }
            that.setState({
                movieInfo:res.data,
                loading:false,
                ratingnum:num
            })
        }).catch((err)=>{
            console.log(err)
            that.setState({
                loading:true
            })
        })
    }
}
 
export default Detail;