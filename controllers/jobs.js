const Job = require("../models/job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// /:id
const getJob = async (req, res) => {
  console.log(req.user);

  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) throw new NotFoundError(`No job with id ${jobId}`);

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // console.log(req.user); // { userId: '6656bceca0138e812452c6cc', name: 'Alex' }
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
