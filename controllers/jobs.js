const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = (req, res) => {
  res.send("Get all jobs");
};

const getJob = (req, res) => {
  res.send("Get job");
};

const createJob = async (req, res) => {
  console.log(req.user); // { userId: '6656bceca0138e812452c6cc', name: 'Alex' }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = (req, res) => {
  res.send("Update job");
};

const deleteJob = (req, res) => {
  res.send("Delete job");
};
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
