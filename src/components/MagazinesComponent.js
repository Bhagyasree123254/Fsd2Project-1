import React from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderItem({item}){
    return(
      <Card>
         <Link to={`/magazines/${item.id}`}>
            <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
            <CardHeader><h3>{item.name}</h3></CardHeader>
         </Link>    
      </Card>
      
    );
}


const MagazinesMain = (props) => {

        const items = props.magazines.filteredItems.map((item) => {
            return (
              <div key={item.id} className="col-12 col-md-3">
                <RenderItem item={item} />
                <br />
              </div>
             );
        });

        if (props.magazines.isLoading) {
          return(
              <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
              </div>
          );
        }
        else if (props.magazines.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.magazines.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else{
          return (
            <div className="container">
              <div className="row">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>Magazines</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                      <h3>MAGAZINES</h3>
                      <hr />
                  </div>                
              </div>
              <div className="col-12 col-md-2">
                <h5>Filter By Language:</h5>
                <select className="form-control" value={props.magazines.language}
                    onChange={(e) => props.filterByLanguage(props.magazines.magazines, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                </select>
              </div>
              <div className="col-12 col-md-2">
                <h5>Filter By Category:</h5>
                <select className="form-control" value={props.magazines.category}
                    onChange={(e) => props.filterByCategory(props.magazines.magazines, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="tech">Tech</option>
                    <option value="entertainment">Entertainment</option>
                </select>
              </div>
              <br />
              <div className="row">
                 {items} 
              </div>
            </div>
          );
        }  
}

export default MagazinesMain;
