document.getElementById("output").innerHTML = `
<table border="1" cellpadding="8" style="margin:auto;">
<tr>
  <th>Model Type</th>
  <th>Accuracy</th>
</tr>
<tr>
  <td>CNN</td>
  <td>94.5%</td>
</tr>
<tr>
  <td>Dense Neural Network</td>
  <td>89.2%</td>
</tr>
</table>

<p><b>Observation:</b> CNN performs better than Dense Network.</p>

<p><b>Reason:</b> CNN extracts spatial features from images, while Dense networks do not.</p>
`;




