import React, {useState} from 'react'
import { Card, CardBody } from 'reactstrap'
import { useDropzone } from 'react-dropzone';
import ah from '../../../helpers/Axhelper';
import appConstant from '../../../constants';

function UploadCard(props) {
    const url = appConstant.baseUrl+"leads/upload/";
    const [uploadProgress, setUploadProgress] = useState(0);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);
            let result = await ah.sendUploadAsync(url,formData,(progressEvent)=>{
                //console.log("We've got progress event: ",progressEvent);
                setUploadProgress(progressEvent);
            })
            console.log(`Upload has finished, result: `,result);
        }
    });

    return (
        <Card>
            <CardBody>
                <div className="uploadComponent">
                    <div {...getRootProps()} style={dropzoneStyle}>
                        <input {...getInputProps()} />
                        <p className='mb-0 mt-0'>Drag & drop a file here, or click to select a file</p>
                    </div>
                    {uploadProgress > 0 && (
                        <div>
                            <p>Uploading: {uploadProgress}%</p>
                            <progress value={uploadProgress} max="100" />
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}

const dropzoneStyle = {
    width: '100%',
    height: '100px',
    border: '1px dashed #dddddd',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  };

export default UploadCard
