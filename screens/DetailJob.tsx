import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';

function DetailJob({ navigation, route }: { navigation: any; route: any }) {
    const { job } = route.params;


    const handleDelete = async (id: string) => {
        const dataRes = await axios.delete(
            `http://kiemtra.stecom.vn:8888/api/cong-viec/PDT0220466/${id}`,
        );
        if (dataRes.status === 200) {
            navigation.navigate('All');
        }
    };

    const createButtonAlert = () => {
        Alert.alert('Xác nhận', 'Bạn chắc chắn muốn xóa công việc này ?', [
            {
                text: 'Hủy',
                onPress: () => console.log('Cancel pressed!'),
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: () => handleDelete(job?.id),
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
                <Text style={styles.title}>Thông tin chi tiết công việc</Text>
                <View />
            </View>

            {/* Content */}
            <View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Mã số thuế</Text>
                    <Text style={styles.textValue}>{job?.maSoThue}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Tên công ty</Text>
                    <Text style={styles.textValue}>{job?.tenCongTy}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Vị trí tuyển dụng</Text>
                    <Text style={styles.textValue}>{job?.viTriTuyenDung}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Yêu cầu</Text>
                    <Text style={styles.textValue}>{job?.yeuCauTuyenDung}</Text>
                </View>
                <View style={styles.boxValue}>
                    <Text style={styles.label}>Địa chỉ</Text>
                    <Text style={styles.textValue}>{job?.diaChi}</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={createButtonAlert}>
                    <Text style={{ color: 'black' }}>Xóa công việc</Text>
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
        marginVertical: 16,
    },
    label: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 8,
    },
    textValue: {
        color: 'black',
        fontSize: 16,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    deleteText: {
        color: '#306da3',
        textDecorationLine: 'underline',
    },
    btn: {
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: 'black',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default DetailJob;
