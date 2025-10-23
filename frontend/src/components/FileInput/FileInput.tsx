import {useRef, useState} from "react";
import Grid from "@mui/material/Grid";
import {Button, TextField} from "@mui/material";

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
    disabled?: boolean;
}

const FileInput: React.FC<Props> = ({onChange, name, label = "Image", disabled = false}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        if(e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }

        onChange(e);
    };

    const activateInput = () => {
        if (disabled) return;

        if(inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div>
            <input
                style={{display: 'none'}}
                type="file"
                name={name}
                onChange={onFileChange}
                ref={inputRef}
                disabled={disabled}
            />

            <Grid container spacing={2} direction="row" alignItems="center">
                <Grid>
                    <TextField
                        disabled
                        label={label}
                        value={fileName}
                        onClick={activateInput}
                        sx={{
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            '& .MuiInputBase-input': {
                                cursor: disabled ? 'not-allowed' : 'pointer',
                            }
                        }}
                    />
                </Grid>
                <Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={activateInput}
                        disabled={disabled}
                    >
                        Browse
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default FileInput;