package com.example.api.mapper;

import com.example.api.dto.user.UserRequestDTO;
import com.example.api.dto.user.UserResponseDTO;
import com.example.api.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponseDTO toResponseDTO(User user) {
        if (user == null) {
            return null;
        }

        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setAge(user.getAge());

        return dto;
    }

    public User toEntity(UserRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        User user = new User();
        mapirajPoljaIzDTO(dto, user);

        return user;
    }

    public void updateEntityFromDTO(UserRequestDTO dto, User user) {
        if (dto == null || user == null) {
            return;
        }

        mapirajPoljaIzDTO(dto, user);
    }

    private void mapirajPoljaIzDTO(UserRequestDTO dto, User user) {
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setAge(dto.getAge());
    }
}
