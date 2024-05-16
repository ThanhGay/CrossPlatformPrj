import { StyleSheet, Text, View } from 'react-native';

function JobItem({ job }: { job: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.companyName}>{job.tenCongTy}</Text>
            <Text style={styles.normalText}>Vị trí: {job.viTriTuyenDung}</Text>
            <Text style={styles.normalText}>Địa chỉ: {job.diaChi}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 12,
        marginHorizontal: 12,
        marginVertical: 12,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        gap: 4,
    },
    companyName: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
    },
    normalText: {
        color: 'black',
        fontSize: 14,
    }
});

export default JobItem;
