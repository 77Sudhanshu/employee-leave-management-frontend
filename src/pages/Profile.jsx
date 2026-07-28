import { useEffect, useState } from "react";
import { getProfile, uploadProfileImage } from "../services/profileService";
import defaultProfile from "../assets/default-profile.webp.webp";

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getProfile();
            setProfile(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load profile.");
        }
    };

    const handleImageUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            await uploadProfileImage(file);

            alert("Profile image uploaded successfully!");

            loadProfile();

        } catch (error) {

            console.error(error);

            alert("Upload failed.");

        }
    };

    if (!profile) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading...</h3>
            </div>
        );
    }

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3>My Profile</h3>
                </div>

                <div className="card-body text-center">

                <img
    src={
        profile.profileImage
            ? `https://employee-leave-management-backend-a61a.onrender.com/profile/image/${profile.profileImage}`
            : defaultProfile
    }
    alt="Profile"
    className="rounded-circle border"
    width="150"
    height="150"
/>

                    <div className="mt-3">

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />

                    </div>

                    <table className="table table-bordered mt-4">

                        <tbody>

                            <tr>
                                <th>Full Name</th>
                                <td>{profile.fullName}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{profile.email}</td>
                            </tr>

                            <tr>
                                <th>Department</th>
                                <td>{profile.department}</td>
                            </tr>

                            <tr>
                                <th>Designation</th>
                                <td>{profile.designation}</td>
                            </tr>

                            <tr>
                                <th>Role</th>
                                <td>{profile.role}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Profile;