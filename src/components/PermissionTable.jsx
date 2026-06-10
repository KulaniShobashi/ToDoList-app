function PermissionTable() {
  return (
    <div className="permission-table">
      <h3>Role Permissions</h3>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Admin</th>
            <th>Dept-head</th>
            <th>Learner</th>
            <th>Viewer</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Create Topic</td>
            <td>&#9989;</td>
            <td>&#10060;</td>
            <td>&#9989;</td>
            <td>&#10060;</td>
          </tr>

          <tr>
            <td>Delete Topic</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#10060;</td>
            <td>&#10060;</td>
          </tr>

          <tr>
            <td>Add Subtopic</td>
            <td>&#9989;</td>
            <td>&#10060;</td>
            <td>&#9989;</td>
            <td>&#10060;</td>
          </tr>

          <tr>
            <td>Delete Subtopic</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#10060;</td>
            <td>&#10060;</td>
          </tr>

          <tr>
            <td>View Only</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
            <td>&#9989;</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PermissionTable;