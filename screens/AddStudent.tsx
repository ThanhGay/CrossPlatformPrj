import { faArrowLeft, faSleigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

function AddStudent({ navigation }: { navigation: any }) {
    const [name, setName] = useState('');
    const [studentCode, setStudentCode] = useState('');
    const [dob, setDob] = useState('');

    const createButtonAlert = () => {
        Alert.alert(
            'Xác nhận',
            'Bạn chắc chắn muốn hủy bỏ việc thêm sinh viên ?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xác nhận',
                    onPress: () => navigation.navigate('All'),
                },
            ],
        );
    };

    // validate
    const [nameValid, setNameValid] = useState(false);
    const [studentCodeValid, setStudentCodeValid] = useState(false);
    const [dobValid, setDobValid] = useState(false);

    const validateName = (nameStr: string) => {
        const isValid = nameStr.length >= 20;
        setNameValid(isValid);
    };

    const validateStudentCode = (studentCodeStr: string) => {
        const isValid = studentCodeStr.length >= 6;
        setStudentCodeValid(isValid);
    };

    const validateDateOfBirth = (dobStr: string) => {
        const dateRegex = new RegExp(
            /(19|20)\d{2}(\/|-)(0[1-9]|1[0,1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])/,
            'g',
        );
        const isValid = dateRegex.test(dobStr);
        setDobValid(isValid);
    };

    const handleSubmit = async () => {
        const jsonData = JSON.stringify({
            name: name,
            dateOfBirth: dob,
            studentCode: studentCode,
        });

        console.log('post data', jsonData);
        console.log(nameValid, studentCodeValid, dobValid);

        if (nameValid && studentCodeValid && dobValid) {
            const res = await axios.post(
                'http://demo-api.stecom.vn:8888/api/student/create-student',
                jsonData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (res.status === 200) {
                navigation.navigate('All');
            }
        } else {
            Alert.alert(
                'Có gì đó sai sai',
                '- Tên phải dài hơn 20 ký tự.\n- Mã sinh viên dài hơn 6 ký tự\n- Ngày sinh phải định dạng "yyyy-mm-dd"',
            );
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* header */}
                <TouchableOpacity onPress={() => navigation.navigate('All')}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm mới sinh viên</Text>
                <View />
            </View>

            {/* Content */}
            <View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Tên sinh viên</Text>
                    <TextInput
                        defaultValue={name}
                        onChangeText={(newText) => {
                            setName(newText);
                            validateName(newText);
                        }}
                        placeholder="Nhập tên"
                        placeholderTextColor="#bbb"
                        style={styles.textValue}
                    />
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>MSSV</Text>
                    <TextInput
                        defaultValue={studentCode}
                        onChangeText={(newText) => {
                            setStudentCode(newText);
                            validateStudentCode(newText);
                        }}
                        placeholder="Nhập mã sinh viên"
                        placeholderTextColor="#bbb"
                        style={styles.textValue}
                    />
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Ngày sinh</Text>
                    <TextInput
                        defaultValue={dob}
                        onChangeText={(newText) => {
                            setDob(newText);
                            validateDateOfBirth(newText);
                        }}
                        placeholder="Nhập ngày (yyyy-mm-dd)"
                        placeholderTextColor="#bbb"
                        style={styles.textValue}
                    />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={createButtonAlert}>
                    <Text style={styles.deleteText}>Hủy bỏ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: 'black' }}>Lưu lại</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginBottom: 8,
    },
    title: {
        color: 'black',
        fontSize: 20,
    },
    boxValue: {
        marginVertical: 8,
    },
    label: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 4,
    },
    textValue: {
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'black',
    },
    deleteText: {
        color: '#306da3',
        textDecorationLine: 'underline',
    },
    submitBtn: {
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'black',
        shadowOpacity: 40,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default AddStudent;
