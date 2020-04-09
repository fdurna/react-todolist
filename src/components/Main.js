import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:4000/tasks`)
            .then(res => {
                const tasks = res.data;
                this.setState({ tasks });
            })
    }
    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }
    handleSubmit(event) {
        const task = {
            text:this.state.text
        }
        axios.post('http://localhost:4000/tasks',task)
            .then(res => {
                this.setState({
                    text:'',
                    tasks:[...this.state.tasks,res.data]
                })
            })
            .catch(err => {
                console.log(err);
            });
            //this.state.text = '';
            event.preventDefault();
    }
    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Grid>
                        <List className="root">
                            {
                                this.state.tasks.map((task,i) =>
                                        <ListItem alignItems="center" key={i}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className="inline"
                                                            color="textPrimary">
                                                            {task.text}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                )
                            }
                        </List>
                        <form onSubmit={this.handleSubmit} id="taskForm">
                            <Box mb={4}>
                            <Typography variant="h6" >
                                    TASK ADD
                            </Typography>
                            </Box>
                            <Box m={3}>
                                <TextField
                                    onChange={this.handleChange}
                                    value={this.state.text}
                                    name="text"
                                    id="outlined-secondary"
                                    label="Text"
                                    variant="outlined"
                                    color="secondary"
                                />
                            </Box>
                            <Button type="submit" variant="contained" color="secondary">ADD</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default Main;