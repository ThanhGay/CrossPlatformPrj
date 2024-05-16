import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';

function DetailStudent({ navigation, route }: { navigation: any; route: any }) {
    const { student } = route.params;
    const mapStudent = {
        ...student,
        dateOfBirth: student.dateOfBirth.split('T')[0],
    };

    const handleDelete = async (id: string) => {
        const dataRes = await axios.delete(
            `http://demo-api.stecom.vn:8888/api/student/delete/${id}`,
        );
        if (dataRes.status === 200) {
            navigation.navigate('All');
        }
    };

    const createButtonAlert = () => {
        Alert.alert('Xác nhận', 'Bạn chắc chắn muốn xóa sinh viên này ?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel pressed!'),
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: () => handleDelete(mapStudent.id),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* header */}
                <TouchableOpacity onPress={() => navigation.navigate('All')}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Thông tin chi tiết sinh viên</Text>
                <View />
            </View>

            {/* Content */}
            <View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Tên sinh viên</Text>
                    <Text style={styles.textValue}>{mapStudent.name}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>MSSV</Text>
                    <Text style={styles.textValue}>
                        {mapStudent.studentCode}
                    </Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Ngày sinh</Text>
                    <Text style={styles.textValue}>
                        {mapStudent.dateOfBirth}
                    </Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Lớp</Text>
                    <Text style={styles.textValue}>{mapStudent?.class}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.textValue}>{mapStudent?.email}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Địa chỉ</Text>
                    <View style={{ padding: 4, borderWidth: 1 }}>
                        <TextInput
                            editable={false}
                            multiline
                            numberOfLines={4}
                            defaultValue={mapStudent?.address}
                        />
                    </View>
                </View>
            </View>

            {/* Footer */}
            <TouchableOpacity onPress={createButtonAlert}>
                <Text style={styles.deleteText}>Xóa sinh viên</Text>
            </TouchableOpacity>
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
        paddingBottom: 4,
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    deleteText: {
        color: '#306da3',
        textDecorationLine: 'underline',
    },
});

export default DetailStudent;
