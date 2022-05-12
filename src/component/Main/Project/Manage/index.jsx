import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";

import {
  assignEmployee,
  getProjectsDetails,
  createProjectComment,
  fetchServices,
  fetchProjectStatus,
  createQuotationDetails,
  createQuotationServices,
  finalizeQuotation,
  showQuotationToClient,
  getEmployeeList,
  createProjectStatus,
} from "../../../../store/action";
import { dateFormatting } from "./../../../Shared/Helpers/dateFormat";
import MainBody from "../../../UI/MainBody";
import Comment from "./comment";
import CreateQuotation from "./CreateQuotation";
import UpdateQuotation from "./UpdateQuotation";
import ViewQuotation from "./ViewQuotation";
import ViewBillingInvoice from "./Billing";
import ViewSaleInvoice from "./Invoice";
import OfficialReceipt from "./Official";
import ProjectHistory from "./projectHistory";

const ManageModule = (props) => {
  const projectId = props.match.params.project_id;
  const {
    assignEmployee,
    project,
    getProjectsDetails,
    fetchProjectStatus,
    user_level_acc,
    usersList,
    createProjectComment,
    createQuotationDetails,
    createQuotationServices,
    createProjectStatus,
    fetchServices,
    finalizeQuotation,
    showQuotationToClient,
    getEmployeeList,
    services,
  } = props;
  const [projectDetails, setProjectDetails] = useState({});
  const [projectFiles, setProjectFiles] = useState([]);
  const [projectComments, setProjectComments] = useState([]);
  const [projectQuotation, setProjectQuotation] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);

  const [showCreateQuotation, setShowCreateQuotation] = useState(false);
  const [showUpdateQuotation, setShowUpdateQuotation] = useState(false);
  const [showViewQuotation, setShowViewQuotation] = useState(false);
  const [showViewBillingInvoice, setShowViewBillingInvoice] = useState(false);
  const [showViewSaleInvoice, setShowViewSaleInvoice] = useState(false);
  const [showOfficialReceipt, setShowOfficialReceipt] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSelectedEmployee(value);
  };

  useEffect(() => {
    fetchServices();
    getEmployeeList();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setProjectDetails(project.projectDetails);
      setProjectFiles(project.projectFiles);
      setProjectComments(project.projectComments);
      setProjectQuotation(project.projectQuotation);
      setProjectStatus(project.projectStatus);
    } else {
      getProjectsDetails(projectId).then(() => {
        setIsLoaded(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    project.projectDetails,
    project.projectComments,
    project.projectFiles,
    project.projectQuotation,
    project.projectStatus,
    projectId,
    isLoaded,
  ]);

  const quotationStatusReturn = {
    accept: () => (
      <Button
        className="my-3 mx-1"
        variant="success"
        onClick={() =>
          finalizeQuotation({
            projectId,
            project_qoutation_detail_id:
              projectQuotation.project_qoutation_detail_id,
          })
        }
      >
        Accept Offer
      </Button>
    ),
    createQuotation: () => (
      <Button
        className="my-1 mx-1"
        variant="primary"
        onClick={() => setShowCreateQuotation(true)}
      >
        Create Quotation
      </Button>
    ),
    decline: () => (
      <Button
        className="my-1 mx-1"
        variant="cancel"
        onClick={() => setShowCreateQuotation(true)}
      >
        Decline Offer
      </Button>
    ),
    updateQoutation: () => (
      <Button
        className="my-1 mx-1"
        variant="primary"
        onClick={() => setShowUpdateQuotation(true)}
      >
        Update Quotation
      </Button>
    ),
    viewQoutation: () => (
      <Button
        className="my-1 mx-1"
        variant="primary"
        onClick={() => setShowViewQuotation(true)}
      >
        View Quotation
      </Button>
    ),
    viewBillingInvoice: () => (
      <Button
        className="my-1 mx-1"
        variant="primary"
        onClick={() => setShowViewBillingInvoice(true)}
      >
        View Billing Invoice
      </Button>
    ),
    viewSaleInvoice: () => (
      <Button
        className="my-1 mx-1"
        variant="primary"
        onClick={() => setShowViewSaleInvoice(true)}
      >
        View Sale Invoice
      </Button>
    ),
    viewOfficialReceipt: () => (
      <Button
        className="my-1 mx-1"
        variant="primary"
        onClick={() => setShowOfficialReceipt(true)}
      >
        View Receipt
      </Button>
    ),
    notCreated: () => (
      <h5 className="border py-3 text-center">
        Quotation was not yet created by the owner
      </h5>
    ),
  };

  const qoutationStatus = () => {
    if (Object.keys(projectQuotation).length > 0) {
      if (user_level_acc === "owner") {
        return (
          <>
            {quotationStatusReturn.viewQoutation()}
            {projectQuotation.is_final === 1 ? (
              <>
                {quotationStatusReturn.viewBillingInvoice()}
                {quotationStatusReturn.viewSaleInvoice()}
                {quotationStatusReturn.viewOfficialReceipt()}
              </>
            ) : (
              quotationStatusReturn.updateQoutation()
            )}
          </>
        );
      } else {
        if (projectQuotation.is_show === 1) {
          return (
            <>
              {quotationStatusReturn.viewQoutation()}
              {projectQuotation.is_final === 1 ? (
                <>
                  {quotationStatusReturn.viewBillingInvoice()}
                  {quotationStatusReturn.viewSaleInvoice()}
                  {quotationStatusReturn.viewOfficialReceipt()}
                </>
              ) : (
                <>{quotationStatusReturn.accept()}</>
              )}
            </>
          );
        }
        return quotationStatusReturn.notCreated();
      }
    } else {
      if (user_level_acc === "owner") {
        return quotationStatusReturn.createQuotation();
      } else {
        return quotationStatusReturn.notCreated();
      }
    }
  };

  return (
    <MainBody>
      <CreateQuotation
        projectDetails={projectDetails}
        createQuotationDetails={createQuotationDetails}
        projectId={projectId}
        show={showCreateQuotation}
        handleClose={() => setShowCreateQuotation(false)}
      />
      <UpdateQuotation
        services={services}
        projectId={projectId}
        createQuotationServices={createQuotationServices}
        showQuotationToClient={showQuotationToClient}
        projectQuotation={projectQuotation}
        show={showUpdateQuotation}
        handleClose={() => setShowUpdateQuotation(false)}
      />
      <ViewQuotation
        services={services}
        projectDetails={projectDetails}
        projectQuotation={projectQuotation}
        show={showViewQuotation}
        user_level_acc={user_level_acc}
        handleClose={() => setShowViewQuotation(false)}
      />
      <ViewBillingInvoice
        services={services}
        projectDetails={projectDetails}
        projectQuotation={projectQuotation}
        show={showViewBillingInvoice}
        user_level_acc={user_level_acc}
        handleClose={() => setShowViewBillingInvoice(false)}
      />
      <ViewSaleInvoice
        services={services}
        projectDetails={projectDetails}
        projectQuotation={projectQuotation}
        show={showViewSaleInvoice}
        user_level_acc={user_level_acc}
        handleClose={() => setShowViewSaleInvoice(false)}
      />
      <OfficialReceipt
        services={services}
        projectDetails={projectDetails}
        projectQuotation={projectQuotation}
        show={showOfficialReceipt}
        user_level_acc={user_level_acc}
        handleClose={() => setShowOfficialReceipt(false)}
      />

      {Object.keys(projectDetails).length > 0 ? (
        <>
          <Row className="my-2 px-2 pb-2 border-bottom ">
            <Col className="d-flex justify-content-between">
              <Card.Title className="mb-0">Project Information</Card.Title>
              <Badge bg={projectDetails.status_acr}>
                {projectDetails.status_name}
              </Badge>
            </Col>
          </Row>

          <Row className="mx-2">
            <Col xs={12} sm={4}>
              Project Name:
            </Col>
            <Col xs={12} sm={8}>
              <p className="my-0 fw-bold">{projectDetails.project_name}</p>
            </Col>
          </Row>

          <Row className="mx-2 mb-2">
            <Col xs={12} sm={4}>
              Date Created:
            </Col>
            <Col xs={12} sm={8} className="my-0">
              {dateFormatting(projectDetails.date_created, "mdy")}
            </Col>
          </Row>

          <Row className="mx-2 mb-2">
            <Col xs={12} sm={4}>
              Project Description:
            </Col>
            <Col xs={12} sm={8} className="my-0">
              <div
                className={`fw-normal text-muted ${
                  projectDetails.project_description && "border"
                } p-2 mb-2`}
                dangerouslySetInnerHTML={{
                  __html: projectDetails.project_description,
                }}
              ></div>
            </Col>
          </Row>

          <Row className="mx-2 mb-2">
            <Col xs={12} sm={4}>
              File Uploaded:
            </Col>
            <Col xs={12} sm={8} className="my-0">
              {/* files */}
              <ListGroup className="d-flex">
                {projectFiles.map((res, index) => {
                  return (
                    <ListGroup.Item
                      key={`file-${index}`}
                      className="d-flex justify-content-between"
                    >
                      <p className="mb-0">{res.original_file_name}</p>

                      <div>
                        <a
                          href={`${process.env.REACT_APP_API_ENDPOINT}/project/download/${projectId}/${res.file_name}`}
                          download
                        >
                          <i className="fas fa-file-download badge bg-primary rounded-pill" />
                        </a>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>

          <Card.Title className="mt-4 px-2 pb-2 border-bottom">
            Receipts
          </Card.Title>
          <Row className="mx-2">
            <Col>
              {qoutationStatus()}

              <Comment
                projectId={projectId}
                createProjectComment={createProjectComment}
                projectComments={projectComments}
              />
            </Col>
          </Row>

          {user_level_acc === "owner" &&
          projectQuotation &&
          projectQuotation.is_final === 1 ? (
            <>
              <Card.Title className="mt-4 px-2 pb-2 border-bottom">
                Employee Assignment
              </Card.Title>
              <Row className="mx-2 mb-2">
                <Col xs={12} md={4}>
                  Assigned Employee:
                </Col>
                <Col xs={12} md={8}>
                  {projectDetails.emp_first_name
                    ? `${projectDetails.emp_last_name}, ${projectDetails.emp_first_name} ${projectDetails.emp_middle_name}`
                    : "No Employee Assigned"}
                </Col>
              </Row>
              <Row className="mx-2">
                <Col>
                  <Form.Group
                    as={Col}
                    className="mb-2"
                    controlId="formBasicFirstName"
                  >
                    <Form.Label className="mb-0">Add Employee: </Form.Label>
                    <Form.Select
                      defaultValue="0"
                      onChange={handleSelectChange}
                      required
                    >
                      <option value="0" disabled>
                        Select Employee
                      </option>
                      {usersList.length > 0
                        ? usersList.map((res) => {
                            return (
                              <option value={`${res.users_id}`}>
                                {res.first_name} {res.last_name}
                              </option>
                            );
                          })
                        : ""}
                    </Form.Select>
                  </Form.Group>
                  <Button
                    disabled={!selectedEmployee}
                    onClick={() =>
                      assignEmployee(
                        projectDetails.project_id,
                        selectedEmployee
                      )
                    }
                  >
                    Assign Employee
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            ""
          )}

          <ProjectHistory
            user_level_acc={user_level_acc}
            createProjectStatus={createProjectStatus}
            projectId={projectDetails.project_id}
            fetchProjectStatus={fetchProjectStatus}
            projectStatus={projectStatus}
          />
        </>
      ) : (
        <h5 className="border py-3 text-center">NoData</h5>
      )}
    </MainBody>
  );
};

const mapStateToProps = (state) => {
  return {
    usersList: state.usersList,
    user_level_acc: state.auth.user_level_acc,
    project: state.project,
    services: state.services,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    assignEmployee: (projectId, employee_id) =>
      dispatch(assignEmployee(projectId, employee_id)),
    createProjectStatus: (projectId, remarks, statusId) =>
      dispatch(createProjectStatus(projectId, remarks, statusId)),
    getProjectsDetails: (projectId) => dispatch(getProjectsDetails(projectId)),
    fetchProjectStatus: (projectId) => dispatch(fetchProjectStatus(projectId)),
    createProjectComment: (commentData) =>
      dispatch(createProjectComment(commentData)),
    createQuotationDetails: (projectData) =>
      dispatch(createQuotationDetails(projectData)),
    createQuotationServices: (projectData) =>
      dispatch(createQuotationServices(projectData)),
    finalizeQuotation: (projectData) =>
      dispatch(finalizeQuotation(projectData)),
    showQuotationToClient: (projectData) =>
      dispatch(showQuotationToClient(projectData)),
    fetchServices: () => dispatch(fetchServices()),
    getEmployeeList: () => dispatch(getEmployeeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageModule);
