import React, { Fragment, useState } from 'react'
import { Form, FormGroup } from "reactstrap"
import { Colxx } from "../../../components/common/CustomBootstrap";

import { useDropzone } from 'react-dropzone';
import ah from '../../../helpers/Axhelper';
import appConstant from '../../../constants';
import sweetalert from 'sweetalert2';

//import UploadCard from "./UploadCard";
//import GetTest from "./GetTest";

const dropzoneStyle = {
    width: '100%',
    // height: '100px',
    // border: '1px dashed #dddddd',
    // borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
};

export default function Images(props) {
    // let settings = props.settings?props.settings:{};

    const urlcover = appConstant.baseUrl + "settings/uploadcover/";
    const urllogo = appConstant.baseUrl+"settings/uploadlogo/";

    const [coverUploadProgress, setCoverUploadProgress] = useState(0);

    // const { acceptedFiles: coverAcceptedFiles, getRootProps: coverGetRootProps, getInputProps: coverGetInputProps } = useDropzone({
    const { getRootProps: coverGetRootProps, getInputProps: coverGetInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            let result = await ah.sendUploadAsync(urlcover, formData, (progressEvent) => {
                //console.log("We've got progress event: ",progressEvent);
                setCoverUploadProgress(progressEvent);
            })
            console.log(`Upload has finished, result: `, result);
            if (result.status === 200) {
                sweetalert.fire({ title: 'Success', text: 'File uploaded successfully', icon: 'success' });
            } else {
                sweetalert.fire({ title: 'Error', text: 'File upload failed. Error: ' + result.error, icon: 'error' });
            }
        }
    });

    const [logoUploadProgress, setLogoUploadProgress] = useState(0);

    // const { acceptedFiles: logoAcceptedFiles, getRootProps: logoGetRootProps, getInputProps: logoGetInputProps } = useDropzone({
    const { getRootProps: logoGetRootProps, getInputProps: logoGetInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            let result = await ah.sendUploadAsync(urllogo, formData, (progressEvent) => {
                //console.log("We've got progress event: ",progressEvent);
                setLogoUploadProgress(progressEvent);
            })
            console.log(`Upload has finished, result: `, result);
            if (result.status === 200) {
                sweetalert.fire({ title: 'Success', text: 'File uploaded successfully', icon: 'success' });
            } else {
                sweetalert.fire({ title: 'Error', text: 'File upload failed. Error: ' + result.error, icon: 'error' });
            }
        }
    });


    return (
        <Fragment>
            <div className="mb-5" id="images">
                <div className="d-flex flex-row align-items-center mb-3">
                    <i className="large-icon initial-height iconsminds-camera-3"></i>
                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <div className="list-item-heading mb-1">
                            <h2>Images</h2>
                        </div>
                    </div>
                </div>
            </div>

            <Form>
                <FormGroup row>

                    <Colxx sm={12} lg={6}>
                        <FormGroup>

                            {/* <div style={{ textAlign: 'center' }} className='mb-4'>
                                <img src="/assets/img/cover-placeholder.jpg" height="150px" alt="Cover placeholder" />
                            </div> */}

                            <div className="uploadComponent">
                                <div {...coverGetRootProps()} style={dropzoneStyle}>
                                    <input {...coverGetInputProps()} />
                                    {/* <p className='mb-0 mt-0'>Drag & drop a file here, Format: JPG, Dimensions: 1920x1080</p> */}
                                    <img src="/assets/img/cover-placeholder.jpg" height="150px" alt="Cover placeholder" />
                                </div>
                                <div {...coverGetRootProps()} style={dropzoneStyle}>
                                </div>

                                {coverUploadProgress > 0 && (
                                    <div>
                                        <p>Uploading: {coverUploadProgress}%</p>
                                        <progress value={coverUploadProgress} max="100" />
                                    </div>
                                )}
                            </div>


                        </FormGroup>
                    </Colxx>


                    <Colxx sm={12} lg={6}>
                        <FormGroup>

                            <div className="uploadComponent">
                                <div {...logoGetRootProps()} style={dropzoneStyle}>
                                    <input {...logoGetInputProps()} />
                                    <img src="/assets/img/logo-placeholder.jpg" height="150px" alt="Cover placeholder" />
                                </div>
                                <div {...logoGetRootProps()} style={dropzoneStyle}>
                                </div>

                                {logoUploadProgress > 0 && (
                                    <div>
                                        <p>Uploading: {logoUploadProgress}%</p>
                                        <progress value={logoUploadProgress} max="100" />
                                    </div>
                                )}
                            </div>

                        </FormGroup>
                    </Colxx>

                </FormGroup>
            </Form>
        </Fragment>

    )
}


