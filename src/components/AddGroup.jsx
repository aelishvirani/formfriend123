import React from 'react'

function AddGroup() {
  return (
    <form>
    <div className="row mb-3">
    <label for="inputGroupname" className="col-sm-2 col-form-label">Group Name : </label>
    <div className="col-sm-5">
      <input type="text" className="form-control" id="inputGroupname"/> 
    </div>
  </div>
    <div className="row mb-3">
    <label for="inputEmail3" className="col-sm-2 col-form-label">Group Email :</label>
    <div className="col-sm-5">
      <input type="email" className="form-control" id="inputEmail3"/>
    </div>
  </div>

    <div className="row mb-3">
    <label for="inputDescription" className="col-sm-2 col-form-label">Group Description :</label>
    <div className="col-sm-5">
      <textarea type="textarea" className="form-control" id="inputDescription"></textarea>
    </div>

    
  </div>

 
    </form>
  )
}

export default AddGroup