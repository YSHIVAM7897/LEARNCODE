const Loading = ( height ) => {  
  return (
    <div style={{height: height.height , display:'flex', alignItems:'center', justifyContent:'center'}}>
      <p className="h4 fw-light text-secondary">Loading...</p> 
    </div>
  );
}

export default Loading;