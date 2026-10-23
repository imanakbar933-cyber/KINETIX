import "./Members.css";

function Members() {

  const members = [
    {
      id: 1,
      name: "Ali Raza",
      email: "ali@gmail.com",
      plan: "Monthly",
      trainer: "Ahmed",
      status: "Active"
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara@gmail.com",
      plan: "3 Months",
      trainer: "Usman",
      status: "Active"
    },
    {
      id: 3,
      name: "Hamza Ali",
      email: "hamza@gmail.com",
      plan: "Monthly",
      trainer: "Ahmed",
      status: "Expired"
    },
    {
      id: 4,
      name: "Ayesha Noor",
      email: "ayesha@gmail.com",
      plan: "6 Months",
      trainer: "Usman",
      status: "Active"
    },
    {
      id: 5,
      name: "Bilal Ahmed",
      email: "bilal@gmail.com",
      plan: "Monthly",
      trainer: "Ahmed",
      status: "Pending"
    }
  ];

  return (
    <div className="members-page">

      <div className="members-header">
        <div>
          <h1>Members</h1>
          <p>Manage all gym members</p>
        </div>

        <button className="add-member-btn">
          + Add Member
        </button>
      </div>


      <div className="members-card">

        <div className="table-top">

          <h2>All Members</h2>

          <input
            type="text"
            placeholder="Search member..."
          />

        </div>


        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Member</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Trainer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>

            {members.map((member) => (

              <tr key={member.id}>

                <td>#{member.id}</td>

                <td>
                  <div className="member-name">
                    <div className="member-avatar">
                      {member.name.charAt(0)}
                    </div>

                    {member.name}
                  </div>
                </td>

                <td>{member.email}</td>

                <td>{member.plan}</td>

                <td>{member.trainer}</td>

                <td>
                  <span
                    className={`status ${member.status.toLowerCase()}`}
                  >
                    {member.status}
                  </span>
                </td>

                <td>
                  <button className="view-btn">
                    View
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Members;