<template>
    <!-- HEADER -->
    <!-- <header>
        <h1>Client List Main Page</h1>
    </header> -->

    <!-- BODY -->
    <body>
        <el-container style="height: 500px">
            <el-header style="background-color: #B2CDCD">
                <h1 style="color: white; margin: 10px 50%; width: 200px">Students List</h1>
            </el-header>
            <el-container>
                <el-container>
                <el-main style="background-color: #e0ebeb">
                    <el-input v-model="newStudent"/>
                    <el-button @click="setNewStudent">SEND</el-button>
                    <MainTable
                        :data="studentsList"
                        :columns="studentsColumns"
                        @handleEdit="handleEdition"
                        @handleButtonConfirmation="handleDeletion"
                    />
                </el-main>
                <el-footer style="background-color: #B2CDCD">Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </body>

    <!-- FOOTER -->
    <footer>
        
    </footer>
    
</template>

<script>
import axios from "axios";
import MainTable from "./MainComponents/MainTable.vue";

export default {
    components: {
        MainTable
    },
    data(){
        return{
            //Students
            newStudent: "",
            studentsList: [],
            studentsColumns: [
                { prop: "id", label: "Id", width: 70},
                { prop: "name", label: "Client Name", width: 200 },
                { prop: "id", label: "", button: true, buttonType: "danger", buttonName: "Delete", popConfirm: true, width: 70},
                { prop: "id", label: "", button: true, buttonType: "warning", buttonName: "Edit", width: 70 }
            ]
        }
    },
    mounted() {
        this.getStudentsList();
    },
    methods: {
        //API Calls
        getStudentsList(){
            axios.get("https://localhost:44347/api/Students/GetStudents")
            .then(resp => {
                this.studentsList = resp.data;
            });
        },
        setNewStudent(){
          axios.post("https://localhost:44347/api/Students/SetStudents",
          { Name: this.newStudent })
          .finally(() => {
            this.newStudent = "";
            this.getStudentsList();
          });
        },
        handleDeletion(index, selectedRow){
            axios.delete(`https://localhost:44347/api/Students/DeleteStudents?StudentId=${selectedRow.id}`)
            .then(() => {
                this.studentsList = [];
                this.getStudentsList();
            });
        },
        handleEdition(index, selectedRow){
          console.log("SELECTED ROW: ", selectedRow);
          axios.post("https://localhost:44347/api/Students/EditStudent",
          { 
            Id: selectedRow.id,
            Name: this.newStudent
          })
          .then(() => {
            this.newStudent = "";
            this.getStudentsList();
          });
        }
    }
}
</script>

<style>

.el-dialog{
    background-color: #e0ebeb;
}

</style>