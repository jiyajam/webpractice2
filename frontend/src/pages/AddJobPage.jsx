const AddJobPage = () => {
  
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitForm called");
   
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value=""
        />
        <label>Job type:</label>
        <select >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value=""

        ></textarea>
        <label>Company Name:</label>
        <input
          type="text"
          required
          value=""
        />
        <label>Contact Email:</label>
        <input
          type="text"
          required
          value=""
        />
        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value=""
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
