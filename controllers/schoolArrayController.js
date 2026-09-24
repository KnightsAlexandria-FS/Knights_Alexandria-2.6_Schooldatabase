
let schools = [
  { id: 1, name: "Full Sail University", location: "Winter Park, FL" },
  { id: 2, name: "UCF", location: "Orlando, FL" },
  { id: 3, name: "USF", location: "Tampa, FL" }
];

exports.getSchoolsArray = (req, res) => {
  res.status(200).json(schools);
};

exports.getSchoolByIdArray = (req, res) => {
  const school = schools.find(s => s.id === parseInt(req.params.id, 10));
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }
  res.status(200).json(school);
};

exports.createSchoolArray = (req, res) => {
  const newSchool = {
    id: schools.length > 0 ? schools[schools.length - 1].id + 1 : 1,
    name: req.body.name,
    location: req.body.location
  };
  schools.push(newSchool);
  res.status(201).json(newSchool);
};

exports.updateSchoolArray = (req, res) => {
  const school = schools.find(s => s.id === parseInt(req.params.id, 10));
  if (!school) {
    return res.status(404).json({ message: "School not found" });
  }

  school.name = req.body.name || school.name;
  school.location = req.body.location || school.location;
  res.status(200).json(school);
};

exports.deleteSchoolArray = (req, res) => {
  const index = schools.findIndex(s => s.id === parseInt(req.params.id, 10));
  if (index === -1) {
    return res.status(404).json({ message: "School not found" });
  }
  const deletedSchool = schools.splice(index, 1);
  res.status(200).json({ message: "School removed", school: deletedSchool[0] });
};